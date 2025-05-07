import { ArrowButton } from 'src/ui/arrow-button';
import { useState } from 'react';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';
import {
	ArticleStateType,
	fontFamilyOptions,
	backgroundColors,
	fontColors,
	OptionType,
	contentWidthArr,
	defaultArticleState,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
};

export const ArticleParamsForm = ({
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState(false);
	const selectedFont: OptionType = defaultArticleState.fontFamilyOption;
	const [font, setFont] = useState(selectedFont);
	const selectedFontColor: OptionType = defaultArticleState.fontColor;
	const [fontColor, setFontColor] = useState(selectedFontColor);
	const selectedBgColor: OptionType = defaultArticleState.backgroundColor;
	const [bgColor, setBgColor] = useState(selectedBgColor);
	const selectedContentWidth: OptionType = defaultArticleState.contentWidth;
	const [contentWidth, setContentWidth] = useState(selectedContentWidth);
	const selectedFontSize: OptionType = defaultArticleState.fontSizeOption;
	const [fontSize, setFontSize] = useState(selectedFontSize);
	const onClick = () => {
		setOpen((prev) => !prev);
	};

	const handleChangeFont = (selected: OptionType) => {
		setFont(selected);
	};
	const handleChangeBgColor = (selected: OptionType) => {
		setBgColor(selected);
	};

	const handleChangeFontColor = (selected: OptionType) => {
		setFontColor(selected);
	};
	const handleChangeContentWidth = (selected: OptionType) => {
		setContentWidth(selected);
	};
	const handleChangeFontSize = (selected: OptionType) => {
		setFontSize(selected);
	};
	const handleApply = (e?: React.MouseEvent) => {
		e?.preventDefault();
		setArticleState({
			fontFamilyOption: font,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};
	const handleReset = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setFontSize(defaultArticleState.fontSizeOption);
		setArticleState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<h1 className={styles.formTitle}>Задайте параметры</h1>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={font}
						onChange={handleChangeFont}
					/>
					<RadioGroup
						name='FontSize'
						title='Размер шрифта'
						selected={fontSize}
						// key={fontSize.value}
						options={fontSizeOptions}
						onChange={handleChangeFontSize}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={fontColor}
						onChange={handleChangeFontColor}
					/>

					<Separator></Separator>
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={bgColor}
						onChange={handleChangeBgColor}
					/>

					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={contentWidth}
						onChange={handleChangeContentWidth}
					/>

					<div className={styles.bottomContainer}>
						<Button
							onClick={handleReset}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button
							onClick={handleApply}
							title='Применить'
							htmlType='submit'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
