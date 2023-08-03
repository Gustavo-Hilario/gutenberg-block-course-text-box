import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';

import { PanelBody, TextareaControl, TextControl } from '@wordpress/components';

import './editor.scss';

function Edit( props ) {
	// withColors give us access to the block colors to easily use them. It checks the theme color settings
	const {
		attributes,
		setAttributes,
		textColor,
		setTextColor,
		backgroundColor,
		setBackgroundColor,
	} = props;

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
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen={ false }
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Block Background Color', 'text-box' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'text-box' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ textColor.color }
						backgroundColor={ backgroundColor.color }
					/>
				</PanelColorSettings>
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
				// By adding className and style we don't overwrite the default classes and styles
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
					style: {
						backgroundColor: `${ backgroundColor.color }`,
						color: `${ textColor.color }`,
					},
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

export default withColors( {
	textColor: 'color',
	backgroundColor: 'background-color',
} )( Edit );
