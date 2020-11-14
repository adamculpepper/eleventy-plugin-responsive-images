module.exports = function(eleventyConfig, pluginNamespace) {
	eleventyConfig.namespace(pluginNamespace, () => {
		eleventyConfig.addShortcode('respimg', parameter => {
			var errors = '';

			if (!parameter.path) {
				errors += 'path parameter missing!';
			} else if (!parameter.sizes) {
				errors += 'sizes parameter missing!';
			}

			if (errors) {
				return '<span style="background:lightsalmon; padding:5px;">' + errors + '</span>';
			} else {
				const hostname = eleventyConfig.hostname ? eleventyConfig.hostname : '';
				const arraySizes = parameter.sizes.replace(/ /g,'').split(',');
				const maxSize = Math.max.apply(Math, arraySizes);
				const baseUrl = `https://res.cloudinary.com/${eleventyConfig.cloudinaryCloudName}/image/fetch/`;
				const imageSrc = `${baseUrl}q_auto,f_auto,w_${maxSize}/${hostname}${parameter.path}`;
				const srcset = arraySizes.map(width => {
					return `${baseUrl}q_auto,f_auto,w_${width}/${hostname}${parameter.path} ${width}w`;
				}).join(',');

				return '<img ' +
					(parameter.width ? ' width="' + parameter.width + '"' : '') +
					(parameter.height ? ' height="' + parameter.height + '"' : '') +
					(parameter.sizes ? ' sizes="(max-width: ' + maxSize + 'px) 100vw, ' + maxSize + 'px"' : '') +
					' src="' + imageSrc + '"' +
					' srcset="' + srcset + '"' +
					(parameter.alt ? ' alt="' + parameter.alt.trim() + '"' : '') +
					(parameter.classes ? ' class="' + parameter.classes + '"' : '') +
					'>';
			}
		});
	});
};