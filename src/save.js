import {
	useBlockProps,
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';

// getColorClassName is a helper function that will return the correct class name from the theme settings

import classNames from 'classnames';

// This is a helper function that will allow us to easily add classes to our block dinamically

export default function save( { attributes } ) {
	const {
		text,
		alignment,
		backgroundColor,
		textColor,
		customBackgroundColor,
		customTextColor,
	} = attributes;

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	const textClass = getColorClassName( 'color', textColor );

	const classes = classNames( `text-box-align-${ alignment }`, {
		// If the backgroundClass variable is defined (theme color), add the class name
		[ backgroundClass ]: backgroundClass,
		// If the textClass variable is defined (theme color), add the class name
		[ textClass ]: textClass,
	} );
	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: classes,
				style: {
					backgroundColor: backgroundClass
						? undefined
						: customBackgroundColor,
					color: textClass ? undefined : customTextColor,
				},
			} ) }
			value={ text }
			tagName="h4"
		/>
	);
}
