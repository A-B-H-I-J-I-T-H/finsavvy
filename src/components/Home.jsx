import React, { useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,Sector,LabelList,Label } from 'recharts';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Carousel from './Carousel';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Dcards from './Dcards';
import DataTable from './DataTable';
import StockChart from './StockChart'

import {useEffect} from 'react'
import axios from "axios";
import {usePlaidLink} from "react-plaid-link";
// import './App.css'

axios.defaults.baseURL ="http://localhost:8000"

function PlaidAuth({publicToken}) {
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      let accessToken = await axios.post("/exchange_public_token", {public_token: publicToken});
      console.log("accessToken", accessToken.data);
      const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken});
      console.log("auth data ", auth.data);
      setAccount(auth.data.numbers.ach[0]);
    }
    fetchData();
  }, []);
  return account && (
      <>
        <p>Account number: {account.account}</p>
        <p>Routing number: {account.routing}</p>
      </>
  );
}

function Home() {
  const productData = [
    { name: 'Product A', price: '$20', status: 'In Stock' },
    { name: 'Product B', price: '$30', status: 'Out of Stock' },
    { name: 'Product C', price: '$25', status: 'In Stock' },
    // Add more product data as needed
  ];
  const tableData = [
    { Name: 'John', Date: '2024-05-06', Amount: '$100', Status: 'Pending' },
    { Name: 'Alice', Date: '2024-05-06', Amount: '$150', Status: 'Completed' },
    { Name: 'Bob', Date: '2024-05-06', Amount: '$120', Status: 'Pending' },
    // Add more data objects as needed
  ];
  const slides = [
    {
      title: 'PRODUCTS',
      icon: <BsFillArchiveFill className="card_icon" />,
      content: '300',
    },
    {
      title: 'CATEGORIES',
      icon: <BsFillGrid3X3GapFill className="card_icon" />,
      content: '12',
    },
    {
      title: 'CUSTOMERS',
      icon: <BsPeopleFill className="card_icon" />,
      content: '33',
    },
    {
      title: 'ALERTS',
      icon: <BsFillBellFill className="card_icon" />,
      content: '42',
    },
  ];
  const data = [
    {
      name: 'Jan',
      amt: 36000,
      sectorId: 1
    },
    {
      name: 'Feb',
      amt: 32000,
      sectorId: 1
    },
    {
      name: 'Mar',
      amt: 29000,
      sectorId: 2
    },
    {
      name: 'Apr',
      amt: 25000,
      sectorId: 2
    },
    {
      name: 'Jun',
      amt: 41000,
      sectorId: 3
    },
    {
      name: 'Jul',
      amt: 22000,
      sectorId: 3
    },
  ];
  const dataPieChart = [
    { name: 'Shopping', value: 1000, sectorId: 1 },
    { name: 'Food', value: 2300, sectorId: 2 },
    { name: 'Entertain', value: 2000, sectorId: 3 },
    { name: 'Hobby', value: 4700, sectorId: 3 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF0000'];
  const barColors = ["#82ca9d","#8884d8"];
  const total = 100000;

  const [selectedSector, setSelectedSector] = useState(1);
  const [hoveredSector, setHoveredSector] = useState(null);

  const handlePieClick = (entry) => {
    setSelectedSector(entry.sectorId);
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <g>
       <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius-1}
          outerRadius={outerRadius + 20}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        
      </g>
    );
  }; 
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();

  useEffect(() => {
    async function fetch() {
      const response = await axios.post("/create_link_token");
      setLinkToken(response.data.link_token);
    }
    fetch();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("success", public_token, metadata);
      // send public_token to server
    },
  });


  return (
    <main className='main-container'>
        <Carousel
          slidesToShow={5}
          slides={[
            { title: "Bike", expense: "300", date: "03-06-2024" },
            { title: "Dubai Trip", expense: "12" , date: "03-06-2024"},
            { title: "PS5", expense: "33" , date: "03-06-2024"},
            { title: "CAR", expense: "42" , date: "03-06-2024"},
            { title: "World Cup", expense: "42" , date: "03-06-2024"},
            { title: "Festival", expense: "42" , date: "03-06-2024"}
          ]}
          slideColors={['#a6f7e2', '#b79bff', '#ffe5a5', '#c7ffa5','#f8a5ff','#a6f7e2']}
        />
        <div className="creditCards">
          <h6>Cards</h6>
          <Dcards />
          <Dcards />
        {publicToken ? (<PlaidAuth publicToken={publicToken} />) : (
      <button onClick={() => open()} disabled={!ready}>
        bank account
      </button>)}
        </div>
        <div className="cash">
          <div className="income">
            <div className='isign'>&#8601;</div>
            <p>Total Income <br /> $632.000</p>
            <div className='iflow'>+ 1.29%</div>
          </div>
          <div className="outcome">
            <div className='osign'>&#8599;</div>
            <p>Total Outcome <br /> $632.000</p>
            <div className='oflow'>- 1.29%</div>
          </div>
        </div>
        <DataTable data={tableData} />

              <ResponsiveContainer width='100%' height={300} className='bar'>
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 50,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                  barCategoryGap={20}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip />
                  <Bar dataKey="amt" radius={[30, 30, 0, 0]}>
                    {
                      data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
                      ))
                    }
                  </Bar>
                </BarChart>

              </ResponsiveContainer>
            
            <ResponsiveContainer width="100%" height={300} className='pie'>
              <PieChart width={500} height={300}>
                <Tooltip />
                <Legend />
                <Pie
                  data={dataPieChart}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  innerRadius={70}
                  fill='#8884d8'
                  onClick={handlePieClick}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                >
                      <Label
                        content={() => (
                          <text x="50%" y="50%" fill="#000" textAnchor="middle" fontSize={15}>
                            <tspan x="50%" dy="-0.7em">Total Balance</tspan>
                            <tspan x="50%" dy="1.4em" fontWeight={900}>${total - dataPieChart.reduce((acc, cur) => acc + cur.value, 0)}</tspan>
                          </text>
                        )}
                      />

                  {dataPieChart.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke={selectedSector === entry.sectorId ? 'none' : 'white'}
                      strokeWidth={selectedSector === entry.sectorId ? 0 : 1}
                      onMouseEnter={() => {
                        onPieEnter();
                      }}
                      onMouseLeave={() => setHoveredSector(null)}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <StockChart data={productData} />

        
        <Calendar />
    </main>
  )
}

export default Home