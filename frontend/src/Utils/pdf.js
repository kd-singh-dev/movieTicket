import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import logo from "../Assets/logo.png";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const logo = "https://i.imgur.com/Ugpvp8N.png";
export const createPdf = (booking, userDetails) => {
  console.log("Creating pdf");
  toDataURL(logo, function (dataUrl) {
    var docDefinition = {
      content: [
        {
          image: dataUrl,
          width: 100,
          alignment: "center",
          margin: [5, 0, 5, 10],
        },
        {
          text: "Movie Ticket Booking Application",
          bold: false,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: "Phone : +91-9xxxxxxxx9 , +91-9xxxxxxxxx9",
          bold: false,
          alignment: "center",
          fontSize: 10,
        },
        {
          text: "Email : admin@gmail.com",
          bold: false,
          alignment: "center",
          fontSize: 10,
          margin: [0, 0, 0, 25],
        },
        {
          columns: [
            {
              width: "*",
              text: "INVOICE",
              fontSize: 36,
              color: "#29bb89",
              bold: true,
            },
            {
              width: "*",
              stack: [
                {
                  columns: [
                    { width: "*", text: "Booking Date :", fontSize: 10 },
                    {
                      width: "*",
                      fontSize: 10,
                      text: booking.createdAt,
                    },
                  ],
                },
                {
                  columns: [
                    { width: "*", text: "Booking ID :", fontSize: 10 },
                    {
                      width: "*",
                      text: booking._id,
                      fontSize: 10,
                    },
                  ],
                },
              ],
            },
          ],
          margin: [0, 10],
        },
        {
          columns: [
            {
              width: "*",
              stack: [
                {
                  text: userDetails.name,
                  fontSize: 24,
                  bold: true,
                  margin: [0, 0, 0, 10],
                },
                {
                  columns: [
                    { width: "auto", text: "Phone : " },
                    {
                      width: "*",
                      text: userDetails.phoneNumber,
                      margin: [4, 0, 0, 0],
                    },
                  ],
                },
                {
                  columns: [
                    { width: "auto", text: "Address : " },
                    {
                      width: "*",
                      text: userDetails.email,
                      margin: [4, 0, 0, 0],
                    },
                  ],
                },
              ],
            },
            {
              width: "*",
              stack: [
                {
                  text: "Booking Details",
                  fontSize: 20,
                  bold: true,
                },
                {
                  text: "---------------------------------------------------------------------",
                  margin: [0, 0, 0, 14],
                },
                {
                  columns: [
                    { width: "*", text: "Movie Date :" },
                    { width: "*", text: booking.bookingDate },
                  ],
                },
              ],
            },
          ],
          margin: [0, 10],
        },
        {
          stack: [
            {
              columns: [
                {
                  columns: [
                    {
                      width: "*",
                      text: "Movie Name",
                      fontSize: 12,
                      bold: true,
                    },
                    {
                      width: "*",
                      text: "Theater",
                      fontSize: 12,
                      bold: true,
                    },
                    {
                      width: "*",
                      text: "Seat Number",
                      fontSize: 12,
                      bold: true,
                    },
                    {
                      width: "*",
                      text: "city",
                      fontSize: 12,
                      bold: true,
                    },
                    {
                      width: "*",
                      text: "Time",
                      fontSize: 12,
                      bold: true,
                    },
                    {
                      width: "*",
                      text: "Price",
                      fontSize: 12,
                      bold: true,
                    },
                  ],
                },
              ],
            },
            {
              text: "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
            },
            {
              columns: [
                {
                  columns: [
                    {
                      width: "*",
                      text: booking.movieId.name,
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: booking.movieId.theater,
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: booking.seatNo,
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: booking.movieId.city,
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: booking.movieId.timeOfShow,
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: booking.amount,
                      fontSize: 10,
                      bold: false,
                    },
                  ],
                },
              ],
              margin: [0, 10],
            },
            {
              text: "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
            },
            {
              columns: [
                {
                  columns: [
                    {
                      width: "*",
                      text: "",
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: "",
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: "",
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: "",
                      fontSize: 10,
                      bold: false,
                    },
                    {
                      width: "*",
                      text: "Total Paid",
                      fontSize: 12,
                      bold: true,
                    },
                    {
                      width: "*",
                      text: `Rs. ${booking.amount}`,
                      fontSize: 12,
                      bold: true,
                    },
                  ],
                },
              ],
              margin: [0, 0],
            },
          ],
          margin: [0, 10, 0, 0],
        },
        {
          text: "Notes : ",
          margin: [0, 80, 0, 5],
        },
        {
          ol: [
            "Our team will get in touch with you shortly.",
            "You will recieve all other necessary information and updates regarding your trip via email.",
            "If you have any emergency concern, kindly contact us via contact methods mentioned above.",
          ],
        },
        {
          text: "-----------------------------------------------------------------------------------------------------------------------------------------------------------",
          margin: [0, 10, 0, 0],
        },
        {
          text: "This is a computer generated invoice and does not need any signatures.",
          fontSize: 10,
          alignment: "center",
        },
      ],
    };
    pdfMake.createPdf(docDefinition).open();
  });
};

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open("GET", url);
  xhr.responseType = "blob";
  xhr.send();
}
