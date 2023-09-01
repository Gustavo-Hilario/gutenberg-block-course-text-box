import { useBlockProps, RichText } from '@wordpress/block-editor';

import classNames from 'classnames';

// Importing all block attributes
import blockData from '../block.json';

const v1 = {
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
		// We're using the spread operator to get all the attributes from block.json but we're also updating the text attribute
		...blockData.attributes,
		text: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
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
				tagName="h4"
			/>
		);
	},
};

export default v1;
