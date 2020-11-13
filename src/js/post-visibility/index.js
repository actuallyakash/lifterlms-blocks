/**
 * Post Visibility settings for courses & memberships
 *
 * @since    1.3.0
 * @version  1.3.0
 */

// WP Deps.
const { registerPlugin } = wp.plugins;

// Internal Deps.
import { default as PostVisibility } from './component';

registerPlugin(
	'llms-post-visibility', {
		render: PostVisibility,
	}
);
