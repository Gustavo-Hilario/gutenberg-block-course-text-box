import { useBlockProps, RichText } from '@wordpress/block-editor';

import classNames from 'classnames';

import _ from 'lodash';

// Importing all block attributes
import blockData from '../block.json';

const v2 = {
	supports: {
		html: false,
		color: {
			text: true,
			background: true,
			gradients: true,
		},
		spacing: {
			margin: true,
			padding: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontFamily: true,
			__experimentalTextDecoration: true,
			__experimentalFontStyle: true,
			__experimentalFontWeight: true,
			__experimentalLetterSpacing: true,
			__experimentalTextTransform: true,
			__experimentalWritingMode: true,
			__experimentalDefaultControls: {
				fontSize: true,
			},
		},
	},
	attributes: {
		// Omit will remove the textAlignment attribute "heading" from the attributes object

		..._.omit( blockData.attributes, [ 'textAlignment' ] ),
		alignment: {
			type: 'string',
			default: 'left',
		},
	},
	// Gets the old attributes and returns the new ones
	// Necessary when the attributes changed
	migrate: ( attributes ) => {
		return {
			..._.omit( attributes, [ 'alignment' ] ),
			textAlignment: attributes.alignment,
		};
	},
	save: ( { attributes } ) => {
		const { text, alignment, shadow, shadowOpacity } = attributes;

		const classes = classNames( `text-box-align-${ alignment }`, {
			'has-shadow': shadow,
			[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
		} );

		return (
			<RichText.Content
				{ ...useBlockProps.save( {
					className: classes,
				} ) }
				value={ text }
				// Here we're using H4
				tagName="p"
			/>
		);
	},
};

export default v2;
