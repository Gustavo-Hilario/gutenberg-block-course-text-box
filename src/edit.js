import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';

import './editor.scss';

export default function Edit( props ) {
	// withColors give us access to the block colors to easily use them. It checks the theme color settings
	const { attributes, setAttributes } = props;

	const { text, alignment } = attributes;

	const onChangeText = ( newtext ) => {
		setAttributes( { text: newtext } );
	};
	const onChangeAlignment = ( newalignment ) => {
		setAttributes( { alignment: newalignment } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Text Controls', 'text-box' ) }
					icon="text"
					initialOpen
				>
					<TextControl
						label={ __( 'Label', 'text-box' ) }
						value={ text }
						onChange={ onChangeText }
						help={ __( 'Help text', 'text-box' ) }
					/>
					<TextareaControl
						label={ __( 'Nice Text Area', 'text-box' ) }
						placeholder={ __(
							'Enter your text here!',
							'text-box'
						) }
						help={ __( 'Help Textarea', 'text-box' ) }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<RichText
				// By using color support, useBlockProps will add the correct classes to our block
				// By adding className and style we don't overwrite the default classes and styles
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
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
