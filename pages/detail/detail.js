import formatIDR from "/util/converter";

Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    property: {},
  },
  onLoad(query) {
    var url = "https://tackier-anodally-jamal.ngrok-free.dev/products/properties/" + query.id

    my.request({
      url: url,
      headers: {
        'content-type': 'application/json',
        'ngrok-skip-browser-warning': '1'
      },
      method: 'GET',
      dataType: 'json',
    }).then((res) => {
      res.data.property.price = formatIDR(res.data.property.price)
      this.setData({ property: res.data.property })
    })
  },
  bookProperty() {
    my.alert({content: 'Property got booked!'});
  },
});