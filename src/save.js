import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { text, alignment, blockbgcolor, textcolor } = attributes;
	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: `text-box-align-${ alignment }`,
				style: {
					backgroundColor: blockbgcolor,
					color: textcolor,
				},
			} ) }
			value={ text }
			tagName="h4"
		/>
	);
}
