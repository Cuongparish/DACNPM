import {
  MouseEventHandler,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MultiValue, SingleValue } from 'react-select';
import SingleDropdown from './SingleDropDown';
import Select from 'react-select';
import { Bold, Italic, List, ListOrdered, Underline } from 'lucide-react';
const UpdateCompanyInfo = ({
  handleComponent,
  companyName,
  company,
}: {
  handleComponent: MouseEventHandler<HTMLButtonElement> | undefined;
  companyName: string;
}) => {
  const [companyInfo, setCompanyInfo] = useState(company);
  const [imageFile, setImageFile] = useState();
  const [image, setImage] = useState();
  const imageUploadRef = useRef(null);
  const handleImageUpload = useCallback(() => {
    imageUploadRef?.current?.click();
  }, []);
  const imagePreview = (e) => {
    const selectedImage = e.target.files[0];
    setImageFile(selectedImage);
    console.log(selectedImage);
    if (selectedImage) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };
  const [fields, setFields] = useState<any>(null);
  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/job/create-info', {
          method: 'GET',
          headers: {
            'Access-control-allow-origin': 'http://localhost:3000',
            'Content-type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setFields(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const convertToOptions = (data: { id: string; name: string }[]) => {
    if (!data) return [];
    return data.map(({ id, name }) => ({ value: id.toString(), label: name }));
  };
  const field = convertToOptions(fields?.field);

  const [scale, setScale] = useState<SingleValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [fieldOptions, setFieldOptions] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const handleUpdateInfo = () => {
    console.log(companyInfo);
  };
  const handleChange = (
    field:
      | 'field'
      | 'taxCode'
      | 'website'
      | 'address'
      | 'phone'
      | 'companySize'
      | 'description',
    value: string,
  ) => {
    const newCompanyInfo = { ...companyInfo };
    newCompanyInfo[field] = value;
    setCompanyInfo(newCompanyInfo);
  };
  return (
    <div className="w-full m-2 flex flex-col">
      <h1 className="text-black text-sl font-bold mb-5">
        Cập nhật thông tin công ty
      </h1>
      {companyName}
      <div className="w-[97%] border-slate-200 border-2 px-8 py-4 space-y-4">
        <div className="w-5/12 flex flex-row items-center space-x-1">
          <span>Logo</span>
          <img
            src={
              image ||
              company.image ||
              'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1114445501.jpg'
            }
            className="rounded-full"
            style={{ width: '32px', height: '32px' }}
            alt="Avatar"
          />
          <input
            type="file"
            name="file"
            ref={imageUploadRef}
            onChange={imagePreview}
            style={{ display: 'none' }}
            accept="image/png, image/gif, image/jpeg"
          />
          <button
            onClick={handleImageUpload}
            className="text-sm btn-success py-1 px-2 rounded bg-gray-100 cursor-pointer"
          >
            Đổi Logo
          </button>
        </div>
        <div className="flex flex-row space-x-10 items-center">
          <div className="space-y-2 w-1/2">
            <span className="text-base">Tên công ty</span>
            <input
              type="text"
              className="  bg-gray-300 border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder={companyName}
              disabled
            />
          </div>

          <div className="space-y-2 w-1/2">
            <span className="text-base">Quy mô công ty</span>
            <input
              type="text"
              className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder="Nhập quy mô công ty"
              value={company.companySize ? company.companySize : ''}
              onChange={(event) =>
                handleChange('companySize', event.currentTarget.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-row space-x-10 items-center">
          <div className="space-y-2 w-1/2">
            <span className="text-base">Mã số thuế</span>
            <input
              type="text"
              className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder="Nhập mã số thuế"
              value={company.taxCode ? company.taxCode : ''}
              onChange={(event) =>
                handleChange('taxCode', event.currentTarget.value)
              }
            />
          </div>

          <div className="space-y-2 w-1/2">
            <span className="text-base">Website</span>
            <input
              type="text"
              className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
              placeholder="http://"
              value={company.website ? company.website : ''}
              onChange={(event) =>
                handleChange('website', event.currentTarget.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-row space-x-10 items-center">
          <div className="w-1/2 space-y-2">
            <span className="text-base">Lĩnh vực hoạt động</span>
            <Select
              styles={{
                control: (base) => ({
                  ...base,
                  boxShadow: 'none',
                  borderColor: '#6B728064',
                  '&:hover': {
                    borderColor: 'green',
                  },
                }),
                option: (base) => ({
                  ...base,
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'lightgrey',
                    fontWeight: 'bold',
                  },
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: '#C4F0D5',
                }),
                multiValueLabel: (base) => ({
                  ...base,
                  color: 'black',
                }),

                placeholder: (base) => ({
                  ...base,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }),
                menu: (base) => ({
                  ...base,
                  maxHeight: '200px', // Set maximum height for the dropdown menu
                  overflowY: 'auto',
                }),
              }}
              isClearable
              isMulti
              placeholder="-- Chọn lĩnh vực --"
              options={field}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(
                e: SetStateAction<MultiValue<{ value: string; label: string }>>,
              ) => {
                setFieldOptions(companyInfo.field);
                const chosenFields = [];
                e.map((item) => {
                  chosenFields.push(item.value);
                });
                console.log(chosenFields);
                handleChange('field', chosenFields);
              }}
              required
            />
          </div>
          <div className="w-1/2 space-y-2">
            {/* <span className="text-base">Quy mô</span>
            <SingleDropdown
              placeholder="-- Chọn quy mô công ty --"
              options={Scale}
              onChange={(
                e: SetStateAction<
                  SingleValue<{ value: string; label: string }>
                >,
              ) => setScale(e)}
            /> */}
          </div>
        </div>
        <div className="flex flex-row space-x-10 items-start">
          <div className="w-1/2 space-y-2">
            <div className="space-y-2">
              <span className="text-base">Địa chỉ</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập địa chỉ"
                value={company.address ? company.address : ''}
                onChange={(event) =>
                  handleChange('address', event.currentTarget.value)
                }
              />
            </div>
            <div className="space-y-2  ">
              <span className="text-base">Điện thoại</span>
              <input
                type="text"
                className=" bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base  w-full p-2.5"
                placeholder="Nhập số điện thoại"
                value={company.phone ? company.phone : ''}
                onChange={(event) =>
                  handleChange('phone', event.currentTarget.value)
                }
              />
            </div>
          </div>
          <div className="space-y-2 w-1/2">
            <span className="text-base mb-2">Mô tả công ty</span>
            <div>
              <div className="px-1 py-2 flex flex-row items-center bg-gray-300 space-x-1">
                <button className="bg-gray-300">
                  <Bold
                    style={{
                      strokeWidth: '4px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Bold>
                </button>
                <button className="bg-gray-300">
                  <Italic
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Italic>
                </button>
                <button className="bg-gray-300">
                  <Underline
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></Underline>
                </button>
                <button className="bg-gray-300">
                  <List
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></List>
                </button>
                <button className="bg-gray-300">
                  <ListOrdered
                    style={{
                      strokeWidth: '2px',
                      color: 'black',
                      width: 15,
                      height: 15,
                      marginRight: 2,
                    }}
                  ></ListOrdered>
                </button>
              </div>
              <textarea
                className="w-full bg-white border border-slate-300 hover:border-green-500 focus:border-green-500 outline-none text-black text-base h-32 p-2.5"
                placeholder="Nhập nội dung mô tả công việc"
                value={company.description ? company.description : ''}
                onChange={(event) =>
                  handleChange('description', event.currentTarget.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="w-10/12 justify-start flex flex-row space-x-3">
          <button
            className="text-base btn-success py-2 px-10 rounded bg-gray-200 border cursor-pointer"
            onClick={handleComponent}
          >
            Hủy
          </button>
          <button
            className="text-base btn-success py-2 px-10 rounded text-white bg-green-500 shadow-md cursor-pointer"
            onClick={handleUpdateInfo}
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateCompanyInfo;
