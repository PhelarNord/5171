const spi = require('spi-device');
 
// The pre is on bus 0 and it's device 0
const pre = spi.open(0, 0, err => { // Is this right for my device?
  // An SPI message is an array of one or more read+write transfers
  const message = [{
    sendBuffer: Buffer.from([0,0,]), //Does binary work here or hex?
    receiveBuffer: Buffer.alloc(1),              
    byteLength: 1,
    speedHz: 10000000 // Does this work? 10Mhz or do i get like 7,8
  }];
 
  if (err) throw err;
 
  pre.transfer(message, (err, message) => {
    if (err) throw err;
 
    // Convert raw value from sensor to celcius and log to console
    const data = message[0].receiveBuffer[1];      
   
 
    console.log(data);
  });
});