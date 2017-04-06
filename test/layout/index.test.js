load("init.js");

testOnAllDevices("Product Page", "/product_page/", function (driver, device) {
    checkLayout(driver, "test/specs/index.spec", device.tags);
});

