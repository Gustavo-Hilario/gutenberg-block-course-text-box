import { __ } from '@wordpress/i18n';

import { useBlockProps, RichText } from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<RichText
			{ ...useBlockProps() }
			onChange={ ( text ) => setAttributes( { text } ) } // Store updated content as a block attribute
			value={ attributes.text } //dynamic value
			placeholder={ __( 'Enter your text here …' ) }
			allowedFormats={ [ 'core/bold', 'core/italic' ] }
			tagName="h4"
		/>
	);
}
