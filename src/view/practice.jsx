import React, { useState } from 'react';
import { Table, Button } from 'antd';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';

const Practice = () => {



  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  
  const [code, setCode] = useState('');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleRunCode = () => {
    // Handle the execution of the SQL code here
    console.log('Executing SQL code:', code);
  };


  return (
    <div className='practice_container' >
      <div className='question'>
        <ul>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
          <li> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus nobis hic architecto temporibus iusto culpa consectetur non sint magni est.</li>
        </ul>

      </div>
      <div className='answer'>


        <AceEditor
          mode="sql"
          theme="github"
          onChange={handleCodeChange}
          name="sql-editor"
          value={code}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          style={{ width: '100%', height: '400px' }}
        />
        <Button type='primary' onClick={handleRunCode}>Run SQL Code</Button>
        <Table columns={columns} dataSource={data} />

      </div>



    </div>
  );
}

export default Practice;
