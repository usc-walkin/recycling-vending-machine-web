import axios from 'axios';
import * as React from 'react';

import Root from '@@components/Root';
import { isBrowser } from '@@utils/utils';

const customerSeed = 'P9JDLEGVQHTNXLHPNAQTPHGUNZYYZHYNRFMTWMYWHFQWJWLSKATWEDTAIUEGWZMMKQMYEYRRQOSYENYMD';

class RootContainer extends React.Component {
  map;
  state = {
    isFetchingData: false,
    message: 'Hi, Catherine! How can I help you?',
  };

  handleClickReturnProduct = (e) => {
    this.setState((state) => {
      return {
        isFetchingData: true,
        message: 'Your item is a CRYSTAL GEYSER platic bottle [sku: 7514000502]\n Please wait until we finish the transaction... This can take upto 30 seconds according to the ledger availability',
      };
    });

    this.map.zoomTo(13);

    axios.post('http://localhost:5123/run', {
      data: {
        sku: 7514000502,
      },
    })
      .then(({ data }) => {
        console.info('data arrived', data);

        this.setState(() => {
          return {
            isFetchingData: false,
            message: `
Your transaction succeeded. Destination address: ${data.result.destinationAddress} Use this in order to later retrieve the token.
Token received: ${data.result.tokenValue}
            `,
          };
        });
      })
      .catch((err) => {
        console.error(err);
      });

  };

  handleClickWithdrawCoin = (e) => {
    this.setState((state) => {
      return {
        isFetchingData: true,
        message: `
You are withdrawing the coin with your seed [${customerSeed}]
Please wait until we finish the transaction... This can take up to 30 seconds according to the ledger availability
`,
      };
    });

    axios.post('http://localhost:5122/withdraw', {
      seed: customerSeed,
    })
      .then(({ data }) => {
        console.info('data arrived', data);

        this.setState(() => {
          return {
            isFetchingData: false,
            message: `
Your transaction succeeded. Destination address: ${data.result.destinationAddress} Use this in order to later retrieve the token.
Token received: ${data.result.tokenValue}
            `,
          };
        });
      })
      .catch((err) => {
        console.error(err);
      });    
  };

  componentDidMount() {
    if (isBrowser()) {
      const mapboxgl = window['mapboxgl'];
      mapboxgl.accessToken = 'pk.eyJ1IjoiZG91Z2xhc2Nvc3RhcnphbiIsImEiOiJjanM5Nm5kM20wbjluNDNta2x0ZHkzbzV3In0.bzAaMosNOt2VucZkfXV2Tw';
      this.map = new mapboxgl.Map({
        center: [-118.2851, 34.0224],
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        zoom: 9,
      });

      new mapboxgl.Marker({
        draggable: false,
      })
        .setLngLat([-118.2851, 34.0224])
        .addTo(this.map);

      new mapboxgl.Marker({
        draggable: false,
      })
        .setLngLat([-118.2881, 34.0239])
        .addTo(this.map);

        new mapboxgl.Marker({
          draggable: false,
        })
          .setLngLat([-118.2841, 34.0242])
          .addTo(this.map);
    }
  }

  render() {
    return (
      <Root 
        handleClickReturnProduct={this.handleClickReturnProduct}
        handleClickWithdrawCoin={this.handleClickWithdrawCoin}
        isFetchingData={this.state.isFetchingData}
        message={this.state.message}
      />
    );
  }
}

export default RootContainer;
