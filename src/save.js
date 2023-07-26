import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	return (
		<RichText.Content
			{ ...useBlockProps.save() }
			value={ attributes.text }
			tagName="h4"
		/>
	);
}
