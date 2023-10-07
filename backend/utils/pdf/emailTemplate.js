import moment from "moment";

export default function ({ profile, document, totalAmountReceived }) {
  return `
    
    <!DOCTYPE html>
    <html lang='en>
    <head>
    <style>
    
    html, body{
        margin:0 auto;
        padding:0;
    },
    .heater{

        line-height:20px;
        font-size:24px;
    }
    .container{
        background-color:#5a5a5a;
        font-family:Arial, Helvitica, sans-serif;
        width:100%;
        color:#484b5b;
        padding:20px 0;
    }

    .content{
        text-align:center;
        background-color:white;
        width:75%;
        margin:0 auto;
        padding:25px;


    }

    .logo{
        width:150px;
        margin:0 auto;
    }

    .divider{
        height:3px;
        background-color:rgb(17, 65, 141);
        margin-bottom:10px;
        margin-top:10px;
    }

    .footer{
        text-align:center;

    }

    .footer p {
        line-height:7px;
        font-size:15px;
    }

    .footer h2{
        font-size:17px;
    }
    </style></head>

    <body>
    
    <div className="container">
    
    <div className="content">
    
    <img src=${profile?.avatar} alt="" className="logo"  alt='logo'/>
    <h1 className="header">
    ${profile?.businessName ? profile?.businessName : profile.firstName}
    </h1>
<hr className="divider" />

<p style="font-size:18px">
Dear Esteemed Customer, ${document.customer.name}
</p>

<p style="font-size:18px">
I trust that this email finds you well. Kindly find Attached ,as a pdf your,  ${
    document.documentType
  }</p>

  <p style="font-size:18px">
If you have paid please ignore this message ... your current balance is  <b>${
    document?.currency
  }</b>
<b>${Math.round(document?.total - totalAmountReceived).toFixed(
    2
  )}</b> , due on <b>  ${moment(document?.dueDate).format("DD-MM-YYYY")}
  
  </b>
  </p>

  <div className="footer">
  <h2>
  ${profile?.businessName}</h2>
  <p>${profile?.phoneNumber}</p>
  </div>
    </div></div>
    </body>

    `;
}
