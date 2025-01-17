import { DownOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Dropdown, Input, Menu, Space } from 'antd';
import React from 'react'
import { BsBoxSeam } from 'react-icons/bs'

const Products = () => {

  const typeMenu = (
    <Menu onClick={(e) => handleStatusFilter(e.key)}>
      <Menu.Item key="Completed">Completed</Menu.Item>
      <Menu.Item key="Pending">Pending</Menu.Item>
      <Menu.Item key="Awaiting Approval">Awaiting Approval</Menu.Item>
    </Menu>
  );
  return (
    <main>
      <div className="w-auto px-auto ">
        <div className="text-[20px] font-medium">
          <h1>Products</h1>
        </div>

        <div className="flex flex-col gap-7 mt-3 md:flex-row justify-center items-center">
          <div className="relative p-4 px-9 w-full  text-white flex flex-col md:flex-row justify-between items-center" style={{ backgroundImage: "linear-gradient(to right, #0b0f3d, #001739, #001a2e, #001a21, #0a1818)" }}>
            <div className='relative'>
              <p className="items-start text-white">Total Products</p>
              <p className=" items-start text-2xl font-semibold text-white">
                4
              </p>
            </div>
            <BsBoxSeam className="absolute right-5 top-1/2 transform -translate-y-1/2 opacity-30 text-[60px]" />

          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-col md:flex-row md:justify-between items-center my-auto">
            <div className="w-full mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:items-center md:gap-4">

              {/* Dropdown Button */}

              <Button className="rounded-none p-4 w-full md:w-auto" type="primary">
                <Space>
                  Add Product
                  <PlusOutlined />
                </Space>
              </Button>

              {/* Product Filter */}
              <Dropdown overlay={typeMenu} trigger={['click']}>
                <Button className="border bg-white rounded px-4 py-[17px] flex items-center space-x-2 w-full md:w-auto">
                  <span>{'--Filter Type--'}</span>
                  <DownOutlined />
                </Button>
              </Dropdown>

              {/* Reset Button */}
              <Button className="rounded-none p-3 w-full md:w-auto" type="default">
                Reset
              </Button>
            </div>

            {/* SEARCH - Align to the right on medium screens */}
            <div className="w-full md:w-auto mt-2 mb-6 md:mt-0 md:ml-auto md:my-auto">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                className="p-[6px] w-full md:w-[300px]" // Dynamic width for small screens, fixed width for medium+
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}

export default Products