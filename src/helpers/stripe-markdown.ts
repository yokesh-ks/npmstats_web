import { remark } from "remark";
import strip from "strip-markdown";

export const stripMarkdown = async (readme: string) => {
	return new Promise((resolve, reject) => {
		remark()
			.use(strip)
			.process(readme, (err, file) => {
				if (err) reject(err);
				resolve(
					String(file).replace(
						/\b(npm|code|library|Node|example|project|license|MIT)\b/gi,
						"",
					),
				);
			});
	});
};
