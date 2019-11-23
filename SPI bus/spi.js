const spi = require('spi-device');
 
// The pre is on bus 0 and it's device 0
const pre = spi.open(0, 0, err => {
  // An SPI message is an array of one or more read+write transfers
  const message = [{
    sendBuffer: Buffer.from([0,0]), // Sent to read channel 5
    receiveBuffer: Buffer.alloc(2),              // Raw data read from channel 5
    byteLength: 2,
    speedHz: 10000000 // Use a low bus speed to get a good reading from the TMP36
  }];
 
  if (err) throw err;
 
  pre.transfer(message, (err, message) => {
    if (err) throw err;
 
    // Convert raw value from sensor to celcius and log to console
    const data = message[0].receiveBuffer[1];      
   
 
    console.log(sendBuffer);
  });
});

