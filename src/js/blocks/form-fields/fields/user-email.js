/**
 * BLOCK: llms/form-field-user-email
 *
 * @since 1.6.0
 * @since 1.8.0 Updated lodash imports.
 */

// WP Deps.
const { __ } = wp.i18n;

// External Deps.
import { cloneDeep } from 'lodash';

// Internal Deps.
import { settings as emailSettings } from './email';

/**
 * Block Name
 *
 * @type {String}
 */
const name = 'llms/form-field-user-email';

/**
 * Array of supported post types.
 *
 * @type {Array}
 */
const post_types = [ 'llms_form' ];

/**
 * Is this a default or composed field?
 *
 * Composed fields serve specific functions (like the User Email Address field)
 * and are automatically added to the form builder UI.
 *
 * Default (non-composed) fields can be added by developers to perform custom functions
 * and are not registered as a block by default
 *
 * @type {String}
 */
const composed = true;

// Setup the field settings.
let settings = cloneDeep( emailSettings );

settings.title       = __( 'User Email', 'lifterlms' );
settings.description = __( 'A special field used to collect a user\'s account email address.', 'lifterlms' );

settings.supports.multiple = false; // Can only have a single email address field.

settings.supports.llms_field_inspector.id = false;
settings.supports.llms_field_inspector.name = false;
settings.supports.llms_field_inspector.required = false;
settings.supports.llms_field_inspector.match = false;

settings.attributes.id.__default       = 'email_address';
settings.attributes.label.__default    = __( 'Email Address', 'lifterlms' );
settings.attributes.name.__default     = 'email_address';
settings.attributes.required.__default = true;
settings.attributes.match.__default    = 'email_address_confirm';

export {
	name,
	post_types,
	composed,
	settings,
};
