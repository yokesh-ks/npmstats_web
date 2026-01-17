// Picked up from http://www.webpagetest.org/
// Speed in KB/s

const DownloadSpeed = {
	THREE_G: 400 / 8, // Slow 3G
	FOUR_G: 7000 / 8, // 4G
};
export const getTimeFromSize = (sizeInBytes: number) => {
	return {
		threeG: sizeInBytes / 1024 / DownloadSpeed.THREE_G,
		fourG: sizeInBytes / 1024 / DownloadSpeed.FOUR_G,
	};
};
