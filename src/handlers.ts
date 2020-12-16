import axios from 'axios';

const creditSearch = async (req, res) => {
  let address = {
    "address1": req.body.address,
    "postcode": req.body.postcode
}

let config = {
  headers: {
    "content-type": "application/json",
  }
}
  
  const idData = await axios.post("https://developer-test-service-2vfxwolfiq-nw.a.run.app/addresses", address, config)

  const id = idData.data[0].id


  let user = {
    "addressId": id, "surname": req.body.surname
  }

  const creditorData = await axios.post("https://developer-test-service-2vfxwolfiq-nw.a.run.app/creditors", user, config)

  /* logic for return */

  let totalVal = 0;
  creditorData.data.forEach(cred => {
    totalVal += cred.value
  });

  let SecuredVal = 0;
  creditorData.data.forEach(cred => {
    if (cred.secured === true) {
      SecuredVal += cred.value
    }
    
  });

  let unsecuredVal = 0;
  creditorData.data.forEach(cred => {
    if (cred.secured === false) {
      unsecuredVal += cred.value
    }
  })

  let qualifies;

  let unsecuredCount = 0;
  creditorData.data.forEach(cred => {
    console.log(cred)
    if (cred.secured === false) {
      unsecuredCount += 1;
    }
  });

  if (unsecuredVal >= 5000 && unsecuredCount > 1) {
    qualifies = true
  } else {
    qualifies = false;
  }

  const returnData = {
    totalCreditorValue: totalVal,
    securedCreditorValue: SecuredVal,
    unsecuredCreditorValue: unsecuredVal,
    qualifies: qualifies
  }

  return res.json(returnData)
}

export default creditSearch