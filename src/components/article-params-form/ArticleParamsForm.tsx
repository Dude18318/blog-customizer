import { ArrowButton } from 'src/ui/arrow-button';
import { useState, useEffect, useRef } from 'react';
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
	articleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	setArticleState,
	articleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setSidebarOpen] = useState(false);
	const selectedFont: OptionType = articleState.fontFamilyOption;
	const [font, setFont] = useState(selectedFont);
	const selectedFontColor: OptionType = articleState.fontColor;
	const [fontColor, setFontColor] = useState(selectedFontColor);
	const selectedBgColor: OptionType = articleState.backgroundColor;
	const [bgColor, setBgColor] = useState(selectedBgColor);
	const selectedContentWidth: OptionType = articleState.contentWidth;
	const [contentWidth, setContentWidth] = useState(selectedContentWidth);
	const selectedFontSize: OptionType = articleState.fontSizeOption;
	const [fontSize, setFontSize] = useState(selectedFontSize);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const onArrowButtonClick = () => {
		setSidebarOpen((prev) => !prev);
	};
	useEffect(() => {}, [isOpen]);
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
	const handleApplyChanges = (e?: React.MouseEvent) => {
		e?.preventDefault();
		setArticleState({
			fontFamilyOption: font,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
			fontSizeOption: fontSize,
		});
	};
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setSidebarOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);
	const handleResetToDefault = () => {
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
			<ArrowButton isOpen={isOpen} onClick={onArrowButtonClick} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onReset={handleResetToDefault}>
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button
							onClick={handleApplyChanges}
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
