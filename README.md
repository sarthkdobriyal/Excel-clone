# MS EXCEL CLONE -
## Core Development Work:
The spreadsheet editor project involved building a web-based application that allows users to edit and manipulate data in a spreadsheet format. The core development work included creating the user interface with HTML and CSS, implementing the logic using Vanilla JavaScript, and integrating the functionality for text manipulations, adding multiple sheets, uploading/downloading sheets, and writing formulas for mathematical calculations using cells.

## Responsibilities:
The development team was responsible for designing and implementing the front-end and back-end functionalities of the spreadsheet editor. This involved creating the user interface, implementing the data manipulation logic, and ensuring that the application runs smoothly on different web browsers and platforms. The team also had to ensure that the application was user-friendly and intuitive, allowing users to perform various spreadsheet operations with ease.

## Challenges:
One of the major challenges in building the spreadsheet editor was implementing the formula bar and the logic for performing mathematical calculations using cells. The team had to ensure that the application could handle complex formulas with multiple operators and operands. Another challenge was implementing the cyclicity check using graph algorithms to prevent infinite loops and crashes when working with circular references in formulas. Additionally, ensuring cross-browser compatibility and responsiveness of the application were also significant challenges.

## Achievements:
The team successfully built a web-based spreadsheet editor that allows users to perform various spreadsheet operations such as text manipulations, adding multiple sheets, uploading/downloading sheets, and writing formulas for mathematical calculations. The application was designed to be user-friendly and intuitive, allowing users to perform these operations with ease. The cyclicity check implemented using graph algorithms was a significant achievement as it prevented the application from crashing due to circular references in formulas. Overall, the project was a success and provided a valuable tool for users to manipulate and manage data in a spreadsheet format.

## All the features and steps to use

- Any cell can be clicked to type in text in the cell and it will be saved.

- Each sheet contains 100 rows and 26 columns(A-Z)

- On clicking any cell the cell id will be displayed below the toolbar on the left. eg - A1

- Text manipulations can be applied to  text in any cell.

-  All text manipulations it can perform are as follows:
    - The Font Style can be changed -- Currently it contains 4 fonts namely --> Monospace, Sans-Serif, Fantasy , Cursive
    - Font Size can be chnaged ranging from 12 to 20.
    - Any text can be bolded (Using B), Underlined (using U), Italicized(Using I)
    - THe font color can be changed to any color
    - THe background color can be changed of any cell
    - The text alignment can be changed --> can be aligned to left, right or center
TO perform the above functions click on the cell you want to apply the features then select the feature you want to apply.

- The text can be copied and pasted by selecting a range of cells
    - To Select a range of cells hold down the LCTRL button and the choose the starting cell and ending cell 
    - ANy cell containing text within the range will automatically get selected 
    - Press the copy button from the toolbar and the range will be copied
    - Then select any cell apart from the range selected , This will be the starting cell of the range 
    - Press the paste button to paste the selected range starting from that position.
    - Any text within the initially selected range will now be copied to the new location

-Similarly the text can be cut by selecting a range of cells as directed above and then clicking the scissors icon. 


- Formulas can be applied to any cell. The formula bar is labelled as fx -> 
    - TO apply a formula to cell :
        - Click the cell to which the formula is to applied
        - Write the formula in the formula bar then press enter
        - The result will be stored in that cell
        - You can go ahead and make changes to other cells, on coming back to the cell the formula will remain

- Formula writing rules:
    - The formula should be space separated as it uses space to decide different operators and operands in the formula
    - The  alphabet in cell id should be in capitals
    - Suppose the current cell is dependent on the cell A1 for value and  10 needs to be added to it then the formula will be (A1 + 10). keep the spaces in mind

- On Changing any value in any cell , if there are any cells dependent on that cell , the values in the children cell can be changed just by revisiting them.

- It contains a cyclic formula detection algorithm which can  trace the cells in the cycle. On entering any cyclic formula , it will show a prompt that the formula is cyclic . To trace the cycle in formula click ok when prompted.

- Cycle is detected when a cell is made dependent on one of its children i.e. on a cell that is already dependent on the initial cell

- Each sheet can be downloaded and saved using the download button (second from right in the toolbar). The sheets are saved as JSON file

- Any saved sheet can be uploaded  using the upload button (first from the right in the toolbar) and the content of the sheet will be displayed

- Multiple sheets can be opened by using the 'ADD Sheet' button at the bottom left.

- TO switch between sheets toggle between the tabs with sheet number on them at the bottom.

- Each sheet is isolated from the others and Data will NOT be lost on toggling between  sheets.

- TO delete any sheet "Right Click" on the sheet tab and a prompt will be displayed to confirm deletion

- On deleting a sheet from in between the other sheets will reorganize themselves in order to maintain correct sequence but order of the sheet will remain.




