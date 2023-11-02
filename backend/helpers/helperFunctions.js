const fs = require("fs").promises;
const path = require("path");

let getCoverPhoto = async (filePath) => {
	const coverFiles = await fs.readdir(filePath);

	const coverImageFiles = coverFiles.filter((file) =>
		/\.(jpg|jpeg|png)$/i.test(file)
	);

	const imageName = coverImageFiles[0];
	return imageName;
};

let getFolderNames = async (filePath) => {
	const picturesFiles = await fs.readdir(filePath);

	const folderNames = await Promise.all(
		picturesFiles.map(async (file) => {
			const fullPath = path.join(filePath, file);
			const stats = await fs.stat(fullPath);

			return stats.isDirectory() ? file : null;
		})
	);

	return folderNames;
};

module.exports = { getCoverPhoto, getFolderNames };
