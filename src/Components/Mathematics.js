import React,{useState,useRef} from "react"
import "./Mathematics.css"
import { Table,Tooltip } from "antd";
import { Button } from 'antd';
import { PlusCircleOutlined,DragOutlined,ArrowLeftOutlined,DeleteOutlined,ArrowRightOutlined } from '@ant-design/icons';
//reference for drag and drop
//https://www.rootstack.com/en/blog/how-do-i-use-drag-and-drop-react/
let id = 10; 

export const Mathematics = () => {
   
//     const columns = [
//         {
//          title: 'Action',
//          dataIndex: '',
//          key: 'x',
//          width:230,
//          render: (text,record) =>  <div className="logos">
//            <Tooltip placement="topLeft" title="Move">
//            <DragOutlined className="logo-svg" />
//            </Tooltip>
//            <Tooltip placement="topLeft" title="Outdent">
//            <ArrowLeftOutlined className="logo-svg" />
//            </Tooltip>
//            <Tooltip placement="topLeft" title="Indent">
//            <ArrowRightOutlined className="logo-svg" />
//            </Tooltip>
//            <Tooltip placement="topLeft" title="Delete"> 
//            <DeleteOutlined onClick={() => handleDelete(record.idx) } className="logo-svg" />
//            </Tooltip>
//          </div>,
//        },
//        {
//            title:'Box',
//            dataIndex:'',
//            key:'x',
//            render: () =>{
//                return(
//                    // <div className="box-container">
//                    <div className="box"></div>
//                    // </div>
//                )
//            }
//        },
//        { 
//        title: 'Name', 
//        dataIndex: 'name',
//        key: 'idx',
//        render: (text, record)  =>{
//           return( <div className="column-1-container">
         	
//       <p className="table-text">{text}</p>
//            </div>);
//        } 
//        },
//    ];
     



     const dragItem = useRef();
     const dragOverItem = useRef();
     const dragStart = (e, position) => {
        dragItem.current = position;
       
      };
      const dragEnter = (e, position) => {
        dragOverItem.current = position;
     
      };
     const data = [
       {
         idx: 0,
         name: 'My father did not even bother to answer me.',
         modu:0,
       },
       {
           idx: 1,
           name: 'There is no play with fire.',
           modu:0
       },
       {
           idx: 2,
           name: 'Stop talking and open your book.',
           modu:0
       },{
           idx: 3,
           name: 'You always want to play games or get attention from me while I’m studying or busy at work.',
           modu:0
       },
       {
           idx: 4,
           name: 'I usually eat popcorns for a snack before my dinner.',
           modu:0
       },
       {
           idx: 5,
           name: 'When I go to a cyclist these days, the rider is always busy, I surely think it will be like this today.',
           modu:0
       },
       {
           idx: 6,
           name: 'When I go to a cyclist these days, the rider is always busy, I surely think it will be like this today.',
           modu:0
       },
       {
           idx: 7,
           name: 'She’s been this city since yesterday.',
           modu:0
       },
       {
           idx: 8,
           name: 'Do you believe my father now?',
           modu:0
       },{
           idx: 9,
           name: 'You undoubtedly should read this book to get results in the fastest way possible.',
           modu:0
       }
     ];
    const [tempData,setTempData] = useState(data);
    const handleDelete = (stid) => {
        setTempData(tempData => tempData.filter(item => item.idx !== stid));
      };
    //   const handlefileUp = e => {
    //     const fileReader = new FileReader();
    //     fileReader.readAsText(e.target.files[0], "UTF-8");
    //     fileReader.onload = e => {
    //       console.log(e.target.result);
    //       let res = [...e.target.result];
    //       setTempData(res);
    //     };
    //   };
    const handleAdd = () =>{
       
        let d = [...tempData];
        let num = id%10;
        let newEntry = data[num];
        d.push({
           idx:id,
           name:newEntry.name,
           modu:0
        })
        id = id + 1;
        setTempData(d);
        
    }
    const drop = (e) => {
        const copyListItems = [...tempData];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setTempData(copyListItems);
      };
    const handleIndent = (index) => {
        // console.log("in"+index)
        let items = [...tempData];
        if(items[index].modu == 2) return;
        items[index].modu+=1;
        items[index].modu = (items[index].modu);
        setTempData(items);
    }
    const handleOutdent = (index) => {
        // console.log("out"+index)
        let items = [...tempData];
        if(items[index].modu == 0) return;
        items[index].modu-=1;
        // items[index].modu = (items[index].modu)%3;
        setTempData(items);
    }
    const handleChange = (e,index) => {
        
        let items = [...tempData];
        
        items[index].name = e.target.value;
        setTempData(items);
    }
    return(
        <div className="container">
            <h2 className="title">MATHEMATICS</h2>
            <hr />
            <div className="header">
                <div className="header-left">
                    <h3 className="header-title">Actions</h3>
                    <p className="header-text">Move,Ident,</p>
                    <p className="header-text">Outdent,Delete</p>
                </div>
                <div className="header-right">
                    <h3 className="header-title">Standard</h3>
                    <p className="header-text">The text of Standard</p>
                </div>
            </div>
            <div className="our-table" >
            {/* <Table
                pagination={false}
                rowKey="idx"
                columns={columns}
                dataSource={tempData}
            /> */}
        
            {
                tempData.length &&
                tempData.map((item,index) =>(
                    <div className="trow" onDragStart={(e) => dragStart(e, index)} onDragEnter={(e) => dragEnter(e, index)} onDragEnd={drop} key={index} draggable>
                    <div className="logos">
                    <Tooltip placement="topLeft" title="Move">
                    <DragOutlined className="logo-svg" />
                    </Tooltip>
                    <Tooltip onClick={() => handleOutdent(index)} placement="topLeft" title="Outdent">
                    <ArrowLeftOutlined className="logo-svg" />
                    </Tooltip>

                    
                    <Tooltip onClick={() => handleIndent(index)} placement="topLeft" title="Indent">
                    <ArrowRightOutlined className="logo-svg" />
                    </Tooltip>
                    <Tooltip placement="topLeft" title="Delete"> 
                    <DeleteOutlined onClick={() => handleDelete(item.idx) } className="logo-svg" />
                    </Tooltip>
                  </div>
                    
                    {
                        item.modu == 0 ? <div className="box0"></div>:null
                    }
                     {
                        item.modu == 1 ? <div className="box1"></div>:null
                    }
                     {
                        item.modu == 2 ? <div className="box2"></div>:null
                    }
                      
                    <div className="column-1-container">
                    {
                        item.modu == 0 ? <input onChange={(e) => handleChange(e,index)} className="table-text-0" value = {item.name} />:null
                    }
                     {
                        item.modu == 1 ? <input  onChange={(e) => handleChange(e,index)} className="table-text-1" value = {item.name} />:null
                    }
                     {
                        item.modu == 2 ? <input  onChange={(e) => handleChange(e,index)} className="table-text-2" value = {item.name} />:null
                    }
                      
                    </div>
                    </div>
                ))
            }
             <Button onClick={() => handleAdd()} type="primary" className="button-standard" icon={<PlusCircleOutlined />} size={'large'}>
                Add a Standard
            </Button>
            {/* <input type="file" onChange={handlefileUp} /> */}
            </div>
        </div>
    );
}

