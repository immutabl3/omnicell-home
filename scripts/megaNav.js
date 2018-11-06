// TODO: remove jquery
import $ from 'jquery';

const isMobileView = () => window.innerWidth <= 977;

const $container = $('#megaNav');

export default function megaNav() {
	Array.from($container.find('[data-rel]'))
		.forEach(link => {
			const $link = $(link);
			const name = $link.attr('data-rel');
			const $target = $($container.find(`[data-id="${name}"]`));

			$link.hover(
				() => !isMobileView() && $target.addClass('active'),
				() => !isMobileView() && $target.removeClass('active')
			);
		});
}
