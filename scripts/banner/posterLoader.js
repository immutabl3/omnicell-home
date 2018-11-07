export default store => {
	return (loadedKey, loadingKey, flagKey, urlKey) => {
		const loadPoster = function() {
			const url = store.get(urlKey);
			const img = new Image();
			img.onload = () => {
				store.set(loadingKey, false);
				store.set(flagKey, true);
			};
			img.src = url;
		};
		return function() {
			if (store.get(loadedKey) || store.get(loadingKey)) return;
			store.set(loadingKey, true);
			loadPoster();
		};
	};
};