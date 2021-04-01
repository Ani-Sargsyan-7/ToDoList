import React, {useState} from 'react';
import {connect} from 'react-redux';
import {textTruncate} from '../../helpers/util';
import {
Container, Row, Col,
InputGroup,FormControl,
Button, Dropdown, Form,
DropdownButton, 
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import {getTasks} from '../../store/actions';
import {FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';



import "react-datepicker/dist/react-datepicker.css";
import styles from './search.module.css'


const statusOptions = [
  {
    label:'Unset',
    value:''
  },
  {
    label:'Active',
    value:'active'
  },
  {
    label:'Done',
    value:'done'
  },
];

const sortOptions = [
  {
    label:'ALL',
    value:'all'
  },
  {
    label:'Z-A',
    value:'z-a'
  },
  {
    label:'A-Z',
    value:'a-z'
  },
  {
    label:'Creation date oldest',
    value:'creation_date_oldest'
  },
  {
    label:'Creation date newest',
    value:'creation_date_newest'
  },
  {
    label:'Complete date oldest',
    value:'complete_date_oldest'
  },
  {
    label:'Complete date newest',
    value:'complete_date_newest'
  },
];


const dateOptions = [
  {
    label:'Created before',
    value:'create_lte'
  },
  {
    label:'Created after',
    value:'create_gte'
  },
  {
    label:'Complete before',
    value:'complete_lte'
  },
  {
    label:'Complete after',
    value:'complete_gte'
  },
];



function SearchTasks(props){

  const [status, setStatus] = useState({
     value: ''
  });

  const [sort, setSort] = useState({
     value: ''
  });

  const [search, setSearch] = useState('');

  const [dates, setDates] = useState({

    create_lte: null,
    create_gte: null,
    complete_lte:null,
    complete_gte:null,

  });

  function reset( ){
    setSort({value:null});
    setStatus({value:null});
    setDates({value:null});
    setSearch('')  
  }
   function handleChange(e){
    setSearch(e.target.value)
  
   }
   
  function handleSubmit(){
    const params = {};
    
    search && (params.search = search);
    sort.value && (params.sort = sort.value);
    status.value && (params.status = status.value);


    for(let key in dates){
      const value = dates[key];
      if(value){
        const date  = value.toLocaleDateString();
        params[key] = date;
      }
     
    }
    props.getTasks(params);
  };

  function handleKeyDown (e){
    if (e.key === "Enter") {
        handleSubmit();
    };
  };

  function returnAllTasks(){
    props.getTasks();
    reset();
  };

  const handleChangeDate = (value, name)=>{
    setDates({
        ...dates,
        [name]: value
    });
};

    return(
      <Container fluid>
      <Row className='justify-content-center'>
      <Col xs={4} md={6} lg={8} xl={10}>
        <InputGroup >
        <Form  className= {styles.form}>
          <FormControl
          className = {styles.searchInput}
          placeholder = "Search Task" 
          onChange = {handleChange}
          onKeyUp={handleKeyDown}
          value = {search}
          />
          <InputGroup.Append  className={styles.inputGroup}>
          <DropdownButton
          className = {styles.BtnforSearch}
          title={<FaSearch/>}
          variant=""
          >
          <DropdownButton
              className = {styles.dropDownBtn}
              onKeyUp={handleKeyDown}
              size ='sm'
              menuAlign = "right"
              variant=""
              title = "Dates"
              >
            { dateOptions.map((opt,index) => (
              <Dropdown
              className = {styles.datepickerDropdown}
              key = {index}
              >
              <span className = {styles.textDropdown}>{opt.label}</span>
              <DatePicker
              className = {styles.datepicker}
              placeholderText="Select a date"
              showWeekNumbers
              isClearable
              selected = {dates[opt.value]}
              onChange = {(value)=> handleChangeDate(value, opt.value)}
              />
              </Dropdown>))}
              </DropdownButton> 
          <DropdownButton
          className = {styles.dropDownBtn}
          size='sm'
          variant=""
          title={status.value ? status.label : "Status"} 
        >
        {statusOptions.map((opt,index) => (
          <Dropdown.Item      
          key = {index}
          active = {status.value === opt.value}
          onClick = {()=>setStatus(opt)}
          >
          {opt.label}
          </Dropdown.Item>))}
          </DropdownButton>

          <DropdownButton
          className = {styles.dropDownBtn}
          size='sm'
          as={InputGroup.Append}
          variant=""
          title={sort.value ? textTruncate(sort.label, 3) : "Sort"}
          >
        {sortOptions.map((opt,index) => (
          <Dropdown.Item
          key = {index}
          active = {sort.value === opt.value}
          onClick = {()=>setSort(opt)}
          >
          {opt.label}
          </Dropdown.Item>))}
          </DropdownButton> 
          </DropdownButton>
          <Button  
          className = {styles.btn}
          onClick = {handleSubmit}>
          Search
          </Button>
          <Button  
          className = {styles.btn}
          onClick = {returnAllTasks}>
          All 
          </Button>
          </InputGroup.Append>
          </Form>
        </InputGroup> 
        </Col>       
        </Row>
    </Container>
  );
};


SearchTasks.propTypes = {
  getTasks:PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  getTasks
}

export default connect(null, mapDispatchToProps)(SearchTasks);