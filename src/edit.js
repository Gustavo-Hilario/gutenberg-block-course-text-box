import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

import './editor.scss';

import {
	// eslint-disable-next-line
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';

import classNames from 'classnames';

export default function Edit( props ) {
	// withColors give us access to the block colors to easily use them. It checks the theme color settings
	const { attributes, setAttributes } = props;

	const { text, alignment, shadow, shadowOpacity } = attributes;

	const onChangeText = ( newtext ) => {
		setAttributes( { text: newtext } );
	};
	const onChangeAlignment = ( newalignment ) => {
		setAttributes( { alignment: newalignment } );
	};

	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	const onChangeShadowOpacity = ( value ) => {
		setAttributes( { shadowOpacity: value } );
	};

	const classes = classNames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	return (
		<>
			<InspectorControls>
				{ shadow && (
					<PanelBody title={ __( 'Shadow Settings', 'text-box' ) }>
						<RangeControl
							label={ __( 'Shadow Opacity', 'text-box' ) }
							value={ shadowOpacity }
							min={ 10 }
							max={ 40 }
							step={ 10 }
							onChange={ ( value ) =>
								onChangeShadowOpacity( value )
							}
						></RangeControl>
					</PanelBody>
				) }
			</InspectorControls>
			<BlockControls
				controls={ [
					{
						icon: 'wordpress',
						title: __( 'Shadow', 'text-box' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<RichText
				// By using color support, useBlockProps will add the correct classes to our block
				// By adding className and style we don't overwrite the default classes and styles
				{ ...useBlockProps( {
					className: classes,
				} ) }
				onChange={ onChangeText } // Store updated content as a block attribute
				value={ text } //dynamic value
				placeholder={ __( 'Enter your text here …' ) }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
				tagName="h4"
			/>
		</>
	);
}
