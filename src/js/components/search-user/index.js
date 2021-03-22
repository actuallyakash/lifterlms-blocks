/**
 * Inspector Control to search the WP database for posts
 *
 * @since 1.0.0
 * @version [version]
 */

// WP Deps.
import { __, sprintf } from '@wordpress/i18n';

// Internal Deps.
import Search from '../search';

export default class SearchUser extends Search {
	/**
	 * Retrieve the default classname for the main Select element
	 *
	 * @since [version]
	 *
	 * @return {string} Class name to be used.
	 */
	getDefaultClassName = () => 'llms-search--user';

	/**
	 * Generates an object of arguments appended to the search URL.
	 *
	 * Merges the searchArgs property with default arguments and the search string.
	 *
	 * @since [version]
	 *
	 * @param {string} search Search string, this will be included in the arguments as the `search` property.
	 * @return {Object} Object of arguments to add to the search API request.
	 */
	getSearchArgs( search ) {
		const args = super.getSearchArgs( search );

		const { roles } = this.props;
		if ( roles ) {
			args.roles = Array.isArray( roles ) ? roles.join( ',' ) : roles;
		}

		return args;
	}

	/**
	 * Retrieve the API request path used to perform the async search
	 *
	 * A custom searchPath can be passed in as a component property.
	 *
	 * @since [version]
	 *
	 * @return {string} API request path.
	 */
	getSearchPath = () => this.props.searchPath || '/wp/v2/users';

	/**
	 * Format the label displayed in search results.
	 *
	 * @since [version]
	 *
	 * @param {Object} result A post response object returned by the search api.
	 * @return {string} Label displayed for the search result item.
	 */
	formatSearchResultLabel = ( result ) =>
		// Translators: %1$s = User's name; %2$s = User's id.
		sprintf( __( '%1$s (ID# %2$d)', 'lifterlms' ), result.name, result.id );
}
