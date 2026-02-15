import formatIDR from "../../util/converter.js"

Page({
  data: {
    isListView: false,
    properties: [],
  },
  onBlur(e) {
    this.searchProperties(e.detail.value)
  },
  onLoad() {
    this.searchProperties("")
  },
  onPullDownRefresh() {
    this.searchProperties("")
  },
  changeLayout() {
    this.setData({
      isListView: !this.data.isListView,
    });
  },
  navigateToDetail(e) {
    my.navigateTo({ url: '../detail/detail?id=' + e.currentTarget.id });
  },
  searchProperties(search) {
    var queryParam = ""
    if (search != "") {
      queryParam = "?search=" + search
    }

    var url = "https://tackier-anodally-jamal.ngrok-free.dev/products/properties" + queryParam

    my.request({
      url: url,
      headers: {
        'content-type': 'application/json',
        'ngrok-skip-browser-warning': '1'
      },
      method: 'GET',
      dataType: 'json',
    }).then((res) => {
      for (var i = 0; i < res.data.properties.length; ++i) {
        res.data.properties[i].price = formatIDR(res.data.properties[i].price)
      }

      this.setData({ properties: res.data.properties })
      my.stopPullDownRefresh()
    })
  }
});