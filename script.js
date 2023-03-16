const puzzlePieces = [];
let backBoard =[];
let shapeName = null;
const numRows = 32; 
const numCols = 16; 
const pieceWidth = 16; 
const pieceHeight = 16;
let rotation = 0;
let comp=[[0,0],[0,0],[0,0],[0,0]];
let k=0;
let intervalID=null;
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let piece = document.createElement('div');
      piece.className = 'square';
      piece.myIndex = k;
      k++;
      piece.myI = i;
      piece.myJ = j;
      piece.style.width = pieceWidth + 'px';
      piece.style.height = pieceHeight + 'px';
      piece.style.backgroundSize = `${pieceWidth * numCols}px ${pieceHeight * numRows}px`;
      piece.style.backgroundPosition = `-${j * pieceWidth}px -${i * pieceHeight}px`;
      puzzlePieces.push(piece);
    }
}
function getPiece(searchedI,searchedJ)
{
    let x=0;
    for(let i=0;i<32;)
    {
        for(let j=0;j<16;j++)
        {
            if(i==searchedI && j==searchedJ) return puzzlePieces[x];
            x++;
        }
    }
}
const gameBoard = document.querySelector('.game-board');
puzzlePieces.forEach(piece => gameBoard.appendChild(piece));
function createBackBoard()
{
    for (var i = 0; i < 32; i++) {
        backBoard[i] = [];
        backBoard[i][0]=3;
        backBoard[i][15]=3;
        for (var j = 1; j < 15; j++) {
            backBoard[i][j] = 0;
        }
    }
    
    for(let k=0;k<16;k++)
    {
        backBoard[31][k]=4;
    }
    
}
let x=0;
function fullLine()
{
    let foundLine = checkFullLine();
    if(foundLine!=-1)
    {
        colorLine(foundLine,"yellow");
        const timeout = setTimeout(startResult(foundLine), 4500);
    }

}
//esti urat
function colorLine(i,color)
{
    x=0;
    for(let k=0;k<32;k++)
    {
        for(let j=0;j<16;j++)
        {
            if(i==k && j!=0 && j!=15) 
            {
                puzzlePieces[x].style.backgroundColor=color;
                backBoard[k][j]=6;
            }
            x++;
        }
    }
}
function startResult(foundLine)
{
    for(let i=0;i<foundLine;i++)
    {
        for(let j=1;j<15;j++)
        {
            if(backBoard[i][j]==1) backBoard[i][j]=5;
        }
    }
    moveGreenDown();
    deleteYellow();
    turnGreenToRed();
}
function moveGreenDown()
{
    flag =1;
    while(flag==1)
    {
        flag =0;
    for(let i=31;i>0;i--)
    {
        for(let j=0;j<16;j++)
        {
            if(backBoard[i][j]==5)
            {
                if(backBoard[i+1][j]!=4 && backBoard[i+1][j]!=1 && backBoard[i+1][j]!=5)
                {
                 backBoard[i+1][j]=backBoard[i][j];
                 backBoard[i][j]=0;
                 flag=1;
                }
            }
        }
    }
    }
}
function turnGreenToRed()
{
    for(let i=0;i<32;i++)
    {
        for(let j=0;j<16;j++)
        {
            if(backBoard[i][j]==5)  backBoard[i][j]=1;
        }
    }
}
function deleteYellow()
{
    x=0;
    for(let i=0;i<32;i++)
    {
        for(let j=0;j<16;j++)
        {
            if(backBoard[i][j]==6) backBoard[i][j]=0;
        }
    }
}
function checkFullLine()
{
    let flag=0;
    for(let i=0;i<31 ; i++ )
    {
        flag=1;
        for(let j=1;j<15;j++)
        {
            if(backBoard[i][j]!=1) flag=0;

        }
        if(flag==1) 
        {
            return i;
        }
    }
    return -1;
}
function Rotate()
{
    switch(shapeName)
    {
        case 1:
            if(checkShape1()) rotate1();
            break;
        case 2:
            if(checkShape2()) rotate2();
            break;
        case 3:
            break;
        case 4:
            if(checkShape4()) rotate4();
            break;
        case 5:
            if(checkShape5()) rotate5();
            break;
        case 6:
            if(checkShape6()) rotate6();
            break;
        case 7:
           if(checkShape7()) rotate7();
            break;
    }
}
function checkShape1()
{
    if(comp[0][0]==0) return false;
    if(comp[1][0]>28) return false;
    if(rotation==0)
    {
        if(backBoard[comp[1][0]-1][comp[1][1]]==1) return false;
        for(let i=1;i<3;i++)
        {
            if(backBoard[comp[1][0]+i][comp[1][1]]==1 || backBoard[comp[1][0]+i][comp[1][1]]==4 ) return false;
        }
    }
    else
    {
        if(backBoard[comp[1][0]][comp[1][1]-1]==1 || backBoard[comp[1][0]][comp[1][1]-1]==3) return false;
        if(backBoard[comp[1][0]][comp[1][1]+1]==1 || backBoard[comp[1][0]][comp[1][1]+1]==3) return false;
        if(backBoard[comp[1][0]][comp[1][1]+2]==1  || backBoard[comp[1][0]][comp[1][1]+2]==3) return false;
    }
    return true;

}
function rotate1()
{
    if(rotation==0) 
    {
        comp[0][0]=comp[0][0]-1;
        comp[0][1]=comp[1][1];
        comp[2][0]=comp[1][0]+1;
        comp[2][1]=comp[1][1];
        comp[3][0]=comp[1][0]+2;
        comp[3][1]=comp[1][1];
        rotation=1;
    }
    else
    {
        comp[0][0]=comp[1][0];
        comp[0][1]=comp[1][1]-1;
        comp[2][0]=comp[1][0];
        comp[2][1]=comp[1][1]+1;
        comp[3][0]=comp[1][0];
        comp[3][1]=comp[1][1]+2;
        rotation=0;
    }

}
function checkShape2()
{
    if(comp[0][0]==0) return false;
    if(comp[1][0]>29) return false;
    if (rotation==0)
    {
        if(backBoard[comp[0][0]][comp[0][1]+1]==1) return false;
        if(backBoard[comp[0][0]][comp[0][1]+2]==1) return false;
        if(backBoard[comp[2][0]+1][comp[2][1]]==1 || backBoard[comp[2][0]+1][comp[2][1]]==4) return false;
    }
    else
    {
        if(backBoard[comp[0][0]][comp[1][1]-1] == 1 || backBoard[comp[0][0]][comp[1][1]-1] == 3) return false;
        if(backBoard[comp[2][0]][comp[2][1]-1]==1 || backBoard[comp[2][0]][comp[2][1]-1]==3 ) return false;
        if(backBoard[comp[2][0]][comp[2][1]+1]==1 || backBoard[comp[2][0]][comp[2][1]+1]==3 ) return false;
    }
    return true;


}
function rotate2()
{
    if(rotation==0)
    {
        comp[0][1]=comp[0][1]+2;
        comp[1][0]=comp[0][0];
        comp[1][1]=comp[2][1];
        comp[3][0]=comp[3][0]+1;
        comp[3][1]=comp[2][1];
        rotation=1;
    }
    else
    {
        comp[0][1]=comp[0][1]-2;
        comp[1][0]=comp[1][0]+1;
        comp[1][1]=comp[1][1]-1;
        comp[3][0]=comp[3][0]-1;
        comp[3][1]=comp[3][1]+1;
        rotation=0;
    }

}
function checkShape4()
{
    if(comp[0][0]==0) return false;
    if(comp[1][0]>29) return false;
    if (rotation==0)
    {
        if(backBoard[comp[0][0]][comp[2][1]]==1 || backBoard[comp[0][0]][comp[2][1]]==3 ) return false;
        if(backBoard[comp[0][0]][comp[1][1]]==1 || backBoard[comp[0][0]][comp[1][1]]==3 ) return false;
        if(backBoard[comp[2][0]+1][comp[2][1]]==1 || backBoard[comp[2][0]+1][comp[2][1]]==4 ) return false;
    }
    else
    {
        if(backBoard[comp[2][0]][comp[2][1]-1]==1 || backBoard[comp[2][0]][comp[2][1]-1]==3) return false;
        if(backBoard[comp[2][0]][comp[2][1]+1]==1 || backBoard[comp[2][0]][comp[2][1]+1]==3) return false;
        if(backBoard[comp[2][0]-1][comp[2][1]+1]==1 || backBoard[comp[2][0]-1][comp[2][1]+1]==3) return false;
    }
    return true;
}
function rotate4()
{
    if(rotation==0)
    {
        comp[0][1]=comp[0][1]-2;
        comp[3][0]=comp[3][0]-1;
        comp[3][1]=comp[3][1]-1;
        comp[1][0]=comp[1][0]+1;
        comp[1][1]=comp[1][1]+1;
        rotation=1;
    }
    else
    {
        comp[0][1]=comp[0][1]+2;
        comp[3][0]=comp[3][0]+1;
        comp[3][1]=comp[3][1]+1;
        comp[1][0]=comp[1][0]-1;
        comp[1][1]=comp[1][1]-1;
        rotation=0;
    }
}
function checkShape5()
{
    if(comp[0][0]==0) return false;
    if(comp[1][0]>29) return false;
    if(rotation==0)
    {
        if(backBoard[comp[1][0]+1][comp[1][1]]==1 || backBoard[comp[1][0]+1][comp[1][1]]==3 ) return false;
        if(backBoard[comp[1][0]+2][comp[1][1]]==1 || backBoard[comp[1][0]+2][comp[1][1]]==4 ) return false;
    }
    else
    {
        if(backBoard[comp[3][0]][comp[3][1]-1]==1 || backBoard[comp[3][0]][comp[3][1]-1]==3  ) return false;
        if(backBoard[comp[0][0]-1][comp[0][1]]==1 || backBoard[comp[0][0]-1][comp[0][1]]==4  ) return false;
    }
    return true;
}
function rotate5()
{
    if(rotation==0)
    {
        comp[2][0]=comp[2][0]-1;
        comp[2][1]=comp[2][1]+1;
        comp[0][0]=comp[0][0]+1;
        comp[0][1]=comp[0][1]+1;
        comp[1][0]=comp[1][0]+2;
        rotation = 1;
    }
    else
    {
        comp[2][0]=comp[2][0]+1;
        comp[2][1]=comp[2][1]-1;
        comp[0][0]=comp[0][0]-1;
        comp[0][1]=comp[0][1]-1;
        comp[1][0]=comp[1][0]-2;
        rotation = 0;
    }
}
function checkShape6()
{
    if(comp[0][0]==0) return false;
    if(comp[1][0]>29) return false;
    if(rotation==0)
    {
        if(backBoard[comp[2][0]+1][comp[2][1]]==1 || backBoard[comp[2][0]+1][comp[2][1]]==4 ) return false;
    }
    else
    {
        if(backBoard[comp[2][0]-1][comp[2][1]]==1 || backBoard[comp[2][0]-1][comp[2][1]]==4 ) return false;
    }
    return true;
}
function rotate6()
{
    if(rotation==0)
    {
        comp[0][0]=comp[0][0]+2;
        rotation=1;
    }
    else
    {
        comp[0][0]=comp[0][0]-2;
        rotation=0;
    }
}
function checkShape7()
{
    if(comp[0][0]==0) return false;
    if(comp[2][0]>29) return false;
    if(rotation==0)
    {
        if(backBoard[comp[2][0]+1][comp[2][1]]==1 || backBoard[comp[2][0]+1][comp[2][1]]==4  ) return false;
        if(backBoard[comp[1][0]][comp[1][1]+1]==1 || backBoard[comp[1][0]][comp[1][1]+1]==4 ) return false;
    }
    else
    {
        if(backBoard[comp[0][0]][comp[0][1]-1]==1 || backBoard[comp[0][0]][comp[0][1]-1]==3) return false;
        if(backBoard[comp[0][0]][comp[0][1]-2]==1 || backBoard[comp[0][0]][comp[0][1]-2]==3) return false;
    }
    return true;
}
function rotate7()
{
    if(rotation==0)
    {
        comp[0][1]=comp[0][1]+2;
        comp[1][0]=comp[1][0]+1;
        comp[1][1]=comp[1][1]+1;
        comp[3][0]=comp[3][0]+1;
        comp[3][1]=comp[3][1]-1;
        rotation=1;
    }
    else
    {
        comp[0][1]=comp[0][1]-2;
        comp[1][0]=comp[1][0]-1;
        comp[1][1]=comp[1][1]-1;
        comp[3][0]=comp[3][0]-1;
        comp[3][1]=comp[3][1]+1;
        rotation=0;
    }
}
function loadBoard()
{
    x=0;
    if(checkLost()) 
    {
        alert("You lost")
        return 0;
    }
    clearBoard();
    loadPiece(2);
    for(let i=0;i<32;i++)
    {
        for(let j=0;j<16;j++)
        {
            if(backBoard[i][j]==1) puzzlePieces[x].style.backgroundColor="red";
            else if(backBoard[i][j]==2) puzzlePieces[x].style.backgroundColor="blue";
            else if(backBoard[i][j]==3 || backBoard[i][j]==4 ) puzzlePieces[x].style.backgroundColor="black";
            else if(backBoard[i][j]==5) puzzlePieces[x].style.backgroundColor="green";
            else puzzlePieces[x].style.backgroundColor="gray";
            x++;
        }
    }
    fullLine();
    
}
function checkLost()
{
    for(let i=0;i<16;i++)
    {
        if(backBoard[0][i]==1) return true;
    }
    return false;
}
function clearBoard()
{
    for (let i = 0; i < backBoard.length-1; i++) {
        for (let j = 1; j< backBoard[i].length-1; j ++)
            if(backBoard[i][j]!=1 && backBoard[i][j]!=5) backBoard[i][j]=0;
    }
}
function moveDown()
{
    if(checkIfSpaceDown())
    {
        comp[0][0]=comp[0][0]+1;
        comp[1][0]=comp[1][0]+1;
        comp[2][0]=comp[2][0]+1;
        comp[3][0]=comp[3][0]+1;
    }
    else
    {
        loadPiece(1)
        generateShape();
    }
}
function moveRight()
{
    if(checkIfSpaceRight())
    {
        comp[0][1]=comp[0][1]+1;
        comp[1][1]=comp[1][1]+1;
        comp[2][1]=comp[2][1]+1;
        comp[3][1]=comp[3][1]+1;
    }

}
function moveLeft()
{
    if(checkIfSpaceLeft())
    {
        comp[0][1]=comp[0][1]-1;
        comp[1][1]=comp[1][1]-1;
        comp[2][1]=comp[2][1]-1;
        comp[3][1]=comp[3][1]-1;
    }

}
function checkIfSpaceDown()
{
    if(backBoard[comp[0][0]+1][comp[0][1]]==4 || backBoard[comp[0][0]+1][comp[0][1]]==1 )
    {
        return false;
    } 
    if(backBoard[comp[1][0]+1][comp[1][1]]==4 || backBoard[comp[1][0]+1][comp[1][1]]==1 )
    {
        return false;
    } 
    if(backBoard[comp[2][0]+1][comp[2][1]]==4 || backBoard[comp[2][0]+1][comp[2][1]]==1 )
    {
        
        return false;
    } 
    if(backBoard[comp[3][0]+1][comp[3][1]]==4 || backBoard[comp[3][0]+1][comp[3][1]]==1 )
    {
       
        return false;
    } 
    else return true
}
function checkIfSpaceRight()
{
    
    if(backBoard[comp[0][0]][comp[0][1]+1]==3 || backBoard[comp[0][0]][comp[0][1]+1]==1 )
    {
        
        return false;
    } 
    if(backBoard[comp[1][0]][comp[1][1]+1]==3 || backBoard[comp[1][0]][comp[1][1]+1]==1 )
    {
        
        return false;
    } 
    if(backBoard[comp[2][0]][comp[2][1]+1]==3 || backBoard[comp[2][0]][comp[2][1]+1]==1 )
    {
        
        return false;
    } 
    if(backBoard[comp[3][0]][comp[3][1]+1]==3 || backBoard[comp[3][0]][comp[3][1]+1]==1 )
    {
        return false;
    } 
    else return true
}
function checkIfSpaceLeft()
{
    
    if(backBoard[comp[0][0]][comp[0][1]-1]==3 || backBoard[comp[0][0]][comp[0][1]-1]==1 )
    {
        return false;
    } 
    if(backBoard[comp[1][0]][comp[1][1]-1]==3 || backBoard[comp[1][0]][comp[1][1]-1]==1 )
    {
        return false;
    } 
    if(backBoard[comp[2][0]][comp[2][1]-1]==3 || backBoard[comp[2][0]][comp[2][1]-1]==1 )
    {
        return false;
    } 
    if(backBoard[comp[3][0]][comp[3][1]-1]==3 || backBoard[comp[3][0]][comp[3][1]-1]==1 )
    {

        return false;
    } 
    else return true
}
function loadPiece(value)
{
    for(let i=0;i<4;i++)
    {
        backBoard[comp[i][0]][comp[i][1]]=value;
    }
}

function generateShape()
{
    let x = getRndInteger(1,7);
    rotation=0;
    let start = getRndInteger(1,11);
    let end = 0;
    switch(x)
    {
        
        case 1:
            
            for(let i=0;i<4;i++)
            {
                comp[i][0]=0;
                comp[i][1]=start+i;
            }
            shapeName = 1;
            break;
        case 2:
            comp[0][0]=0;
            comp[0][1]=start;
            for(let i=1;i<4;i++)
            {
                comp[i][0]=1;
                comp[i][1]=start+i-1;
            }
            shapeName = 2;
            break;
        case 3:
            comp[0][0]=0;
            comp[1][0]=0
            comp[2][0]=1;
            comp[3][0]=1;
            comp[0][1]=start;
            comp[1][1]=start+1;
            comp[2][1]=start;
            comp[3][1]=start+1;
            shapeName = 3;
            break;
        case 4:
            comp[0][0]=0;
            for(let i=1;i<4;i++)
            {
                comp[i][0]=1;
            }
            comp[0][1]=start+2;
            for(let i=1;i<4;i++)
            {
                comp[i][1]=start+i-1;
            }
            shapeName = 4;
            break;
        case 5:
            comp[0][0]=0;
            comp[1][0]=0;
            comp[2][0]=1;
            comp[3][0]=1;
            comp[0][1]=start+1;
            comp[1][1]=start+2;
            comp[2][1]=start;
            comp[3][1]=start+1;
            shapeName = 5;
            break;
        case 6:
            comp[0][0]=0;
            comp[0][1]=start+1;
            for(let i=1;i<4;i++)
            {
                comp[i][0]=1;
                comp[i][1]=start+i-1;
            }
            shapeName = 6;
            break;
        case 7:
            comp[0][0]=0;
            comp[0][1]=start;
            comp[1][0]=0;
            comp[1][1]=start+1;
            comp[2][0]=1;
            comp[2][1]=start+1;
            comp[3][0]=1;
            comp[3][1]=start+2;
            shapeName = 7;
            break;
    }
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
function check()
{
    moveDown();
    loadBoard();
}

function check2()
{
    moveRight();
    loadBoard();
}
function check3()
{
    moveLeft();
    loadBoard();
}
function check4()
{
    Rotate();
    loadBoard();
}
function showComp()
{
    for(let i=0;i<32;i++)
    {
        x = "";
        for(let j=0;j<16;j++)
        {
           x= x+ backBoard[i][j].toString() ;
        }
        console.log(x);
    }
}
function start()
{
    let intervalID=setInterval(() => {
        moveDown();
        loadBoard();
    },350);
}
createBackBoard();
generateShape();
start();
window.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
      return;
    }
    if (event.code === "ArrowDown"){
        check();
    } else if (event.code === "ArrowLeft"){
        check3();
    } else if (event.code === "ArrowRight"){
        check2();
    }
    else if( event.code == "Space")
    {
        check4();
    }
  }, true);


    