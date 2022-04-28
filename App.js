import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input} from "antd";
import moment from 'moment'



import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  
  

  const [editingList, setEditingList] = useState(null);
  const [dataSource, setDataSource] = useState([
   
    
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Timestamp created",
      dataIndex: "timestamp_created",
    },
    {
      key: "3",
      title: "Title",
      dataIndex: "title",
    },
    {
      key: "4",
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "5",
      title: "Status",
      dataIndex: "status",
    },
    {
      key: "6",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditList(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteList(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddList = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newList = {
      id: randomNumber,
  timestamp_created:moment().format('LLLL'),
     
      status:"OPEN"
      
    };
    setDataSource((pre) => {
      return [...pre, newList];
    });
  };
  const onDeleteList = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record from the list?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((List) => List.id !== record.id);
        });
      },
    });
  };
  const onEditList = (record) => {
    setIsEditing(true);
    setEditingList({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingList(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="h1">TO DO LIST</h1>
        
        <Button className="btn" onClick={onAddList}>Add a new List</Button>
        <Table className="table" columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit List"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((List) => {
                if (List.title === editingList.title) {
                  return editingList;
                } else {
                  return List;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingList?.id}
            onChange={(e) => {
              setEditingList((pre) => {
                return { ...pre, id: e.target.value };
              });
            }}
          />
          <Input
            value={editingList?.title}
            placeholder="Title"
            required="required"
            maxLength="100"
            onChange={(e) => {
              setEditingList((pre) => {
                return { ...pre, title: e.target.value };
              });
            }}
          />
          <Input
            value={editingList?.description}
            maxLength="1000"
            placeholder="Description"
            required="required"
            onChange={(e) => {
              setEditingList((pre) => {
                return { ...pre, description: e.target.value };
              });
            }}
          />
          <select

            value={editingList?.status}
            placeholder="Status"
            onChange={(e) => {
              setEditingList((pre) => {
                return { ...pre, status: e.target.value };
              });
            }}
          ><option value="OPEN">OPEN</option>
            <option value="WORKING">WORKING</option>
          <option value="DONE">DONE</option>
          <option value="OVERDUE">OVERDUE</option></select>
        </Modal>
      </header>
    </div>
  );
}

export default App;