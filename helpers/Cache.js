module.exports = {
  data: {},
  set: function (address, value) {
    Object.defineProperty(this.data, address, {
      value: {
          value,
          time: (new Date()).valueOf()
      },
      writable: true,
    });
  },
  get: function (address) {
    return this.data[address];
  },
};
