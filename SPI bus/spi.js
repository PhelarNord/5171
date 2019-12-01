const spi = require('spi-device');

// Integer to binary, for message send buffer
const thatControll={
  Register: function(reg){
    return '0b' + (reg>>>0).toString(2)
  },
  Data: function(data){   
    return '0b' + (data>>>0).toString(2);
  }
}

 
// The pre is on bus 0 and it's device 0
const pre = spi.open(0, 0, err => { // There is just one chip, and its on bus 0
  
  // An SPI message is an array of one or more read+write transfers
  const message = [{
    sendBuffer: Buffer.from(['0b' + thatControll.Register(4).padStart(8,'0'),'0b' + thatControll.Data(0).padStart(8,'0')]), //Do binary with prefix 0b, The bit train is 16 bit
    receiveBuffer: Buffer.alloc(2), //The chip rx/tx is 16bit, lets alloc 2 bytes              
    byteLength: 2,
    speedHz: 10000000 // Does this work? 10Mhz or do i get like 7,8
  }];
 
  if (err) throw err;
 
  pre.transfer(message, (err, message) => {
    if (err) throw err;
 
    // Convert raw value from data and log to console
    const data = message[0].receiveBuffer[1];      
   
 
    console.log(data);
  });
});

