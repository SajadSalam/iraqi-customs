import swAxios from '@/plugins/sw-axios'
import type { Body } from './types'

export const useApplicationService = () => {
  // return type Body
  const initBody = (): Body => {
    // return {
    //   user: {
    //     email: '',
    //     password: '',
    //   },
    //   ceo: {
    //     id: '',
    //     isApplicationNew: true,
    //     isCeoForeigner: false,
    //     fullName: '',
    //     fullNameEn: '',
    //     motherName: '',
    //     country: '',
    //     phoneNumber: '',
    //     image: [],
    //     governorate: '',
    //     city: '',
    //     mahala: 0,
    //     zqaq: 0,
    //     dar: 0,
    //     passportNumber: '',
    //     passportDate: new Date().toISOString().split('T')[0],
    //     documents: [],
    //   },
    //   company: {
    //     id: '',
    //     nameAr: '',
    //     nameEn: '',
    //     url: '',
    //     taxNumber: '',
    //     issuer: '',
    //     chamberNumber: '',
    //     chamberDate: new Date().toISOString().split('T')[0],
    //     branch: '',
    //     governorate: '',
    //     city: '',
    //     mahala: 0,
    //     zqaq: 0,
    //     dar: 0,
    //     agentName: '',
    //     activityType: '',
    //     documents: [],
    //   },
    // }
    return {
      user:
      {
        email: 'test@user.com',
        password: '123@root',
      },
      ceo: {
        id: '',
        isApplicationNew: true,
        isCeoForeigner: false,
        fullName: 'test',
        fullNameEn: 'test',
        motherName: 'test',
        country: 'test',
        phoneNumber: '+9647712345613',
        image: '/Attachments\\d6e5e00f-db1d-41a9-a204-24d264911ef4.png',
        governorate: 'بغدادذ',
        city: '',
        mahala: '122',
        zqaq: '22',
        dar: '2',
        passportNumber: '1213',
        passportDate: '2024-04-21',
        documents: ['/Attachments\\6edd0152-5798-4f19-b828-fa8d0b878398.png'],
      },
      company: {
        id: '',
        nameAr: 'test company',
        nameEn: 'test company',
        url: 'test.com',
        taxNumber: '1243423',
        issuer: 'issuer',
        chamberNumber: '124234',
        chamberDate: '2024-04-21',
        branch: 'بغداد',
        governorate: 'بغداد',
        city: '',
        mahala: '121',
        zqaq: '12',
        dar: '2',
        agentName: 'agent name',
        activityType: 'test',
        documents: ['/Attachments\\1c377370-13f1-401a-bc24-82b8555215d3.png'],
      },
    }
  }

  const saveApplication = async (body: Body) => {
    // const sinbadCustomer = await axios.post('/Customers', {
    //   phoneNumber: body.ceo?.phoneNumber,
    //   fullname: body.ceo?.fullName,
    //   customerType: 1,
    //   isGovernorate: true,
    //   address: 'string',
    // })

    body.relatedId = '0eb80709-c9c2-4afb-83a9-b3de734fe49a'

    // const generatedPhoneNumber = `+96477${Math.floor(10000000 + Math.random() * 90000000)}`

    // await axios.post('/Customers', {
    //   phoneNumber: generatedPhoneNumber,
    //   fullname: body.company?.nameAr,
    //   customerType: 2,
    //   isGovernorate: false,
    //   address: 'string',
    // })
    console.log(body)

    await swAxios.post('/customer', body)
  }

  return {
    initBody,
    saveApplication,
  }
}
