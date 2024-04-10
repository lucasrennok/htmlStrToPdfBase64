const pdf = require("html-pdf");

async function generateBase64PDF(htmlContent, options) {
	try {
		const pdfBuffer = await new Promise((resolve, reject) => {
			pdf.create(htmlContent, options).toBuffer((err, buffer) => {
				if (err) {
					reject(err);
				} else {
					resolve(buffer);
				}
			});
		});

		const base64String = pdfBuffer.toString("base64");

		console.log("PDF gerado com sucesso como string base64");
		return base64String;
	} catch (error) {
		console.error("Erro ao gerar o PDF:", error);
		throw error;
	}
}

const htmlContent = "<html><body><h1>Hello, world!</h1></body></html>";
const options = {
	format: "A4",
	printBackground: true,
	margin: {
		top: "1in",
		right: "1in",
		bottom: "1in",
		left: "1in",
	},
};

generateBase64PDF(htmlContent, options)
	.then((base64String) => {
		console.log("Base64 PDF:", base64String);
	})
	.catch((error) => {
		console.error("Erro:", error);
	});
