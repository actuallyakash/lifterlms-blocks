/**
 * BLOCK: llms/course-syllabus
 *
 * Renders a course syllabus
 *
 * @since 1.0.0
 * @since 1.5.0 Add supported post type settings.
 * @since 1.8.0 Use imports in favor of "wp." variables.
 *              Use @wordpress/server-side-render in favor of wp.components.ServerSideRender.
 */

// WP Deps.
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';

// Internal Deps.
import './editor.scss';
import Inspector from './inspect'

/**
 * Block Name
 * @type {String}
 */
export const name = 'llms/course-syllabus';

/**
 * Array of supported post types.
 *
 * @type {Array}
 */
export const post_types = [ 'course' ];

/**
 * Register Course Syllabus Block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param   {string}   name     Block name.
 * @param   {Object}   settings Block settings.
 * @return  {?WPBlock}          The block, if it has been successfully, registered; otherwise `undefined`.
 * @since   1.0.0
 * @version 1.0.0
 */
export const settings = {

	title: __( 'Course Syllabus', 'lifterlms' ),
	icon: {
		foreground: '#2295ff',
		src: 'grid-view'
	},
	category: 'llms-blocks', // common, formatting, layout widgets, embed. see https://wordpress.org/gutenberg/handbook/block-api/#category.
	keywords: [
		__( 'LifterLMS', 'lifterlms' ),
	],
	attributes: {
		course_id: {
			type: 'int',
			default: 0,
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @param   {Object} props Block properties.
	 * @return  {Function}
	 * @since   1.0.0
	 * @version 1.0.0
	 */
	edit: props => {

		const currentPost = wp.data.select( 'core/editor' ).getCurrentPost()
		const {
			attributes,
			setAttributes,
		} = props

		return (
			<Fragment>
				<Inspector { ...{ attributes, setAttributes } } />

				<ServerSideRender
					block={ name }
					attributes={ attributes }
					urlQueryArgs={ {
						post_id: currentPost.id
					} }
				/>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 * @param   {Object} props Block properties.
	 * @return  {Function}
	 * @since   1.0.0
	 * @version 1.0.0
	 */
	save: () => {
		return null;
	},

}
