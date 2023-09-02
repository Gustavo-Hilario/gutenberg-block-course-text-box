import { useBlockProps, RichText } from '@wordpress/block-editor';
// getColorClassName is a helper function that will return the correct class name from the theme settings
import classNames from 'classnames';

// This is a helper function that will allow us to easily add classes to our block dinamically

export default function save( { attributes } ) {
	const { text, textAlignment, shadow, shadowOpacity } = attributes;

	const classes = classNames( `text-box-align-${ textAlignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: classes,
			} ) }
			value={ text }
			tagName="p"
		/>
	);
}
