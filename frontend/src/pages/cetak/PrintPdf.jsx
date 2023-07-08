import React, { useEffect, useRef, useState } from 'react'
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import Sidebar from '../../components/sidebar/Sidebar';
import "./list.scss"
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

const PrintPdf = () => {

  const [data, setData] = useState([])
  const [data2, setData2] = useState([])


  const [isLoading, setIsLoading] = useState(true)

  const getData = async () => {
    try {
      axios.get(`http://localhost:8081/laporan/export`).then(response => {
        // console.log(response.data.data)
        const data = response.data.data.map((item, index) => ({ ...item, id: index + 1 }))
        setData(data)
        setIsLoading(false)
      })
    } catch (error) {
      Swal.fire(
        'Pesan Kesalahan',
        error.response.data.message,
        'error'
      )
    }
  }

  const getData2 = async () => {
    try {
      axios.get(`http://localhost:8081/laporan/export2`).then(response => {
        // console.log(response.data.data)
        const data2 = response.data.data.map((item, index) => ({ ...item, id: index + 1 }))
        setData2(data2)
        setIsLoading(false)
      })
    } catch (error) {
      Swal.fire(
        'Pesan Kesalahan',
        error.response.data.message,
        'error'
      )
    }
  }

  useEffect(() => {
    if (isLoading) {
      getData()
      getData2()
    }
  }, [isLoading])


  // Komponen PDF
  const MyDocument = () => (
    <Document>
      <Page orientation='landscape'>
        <View style={styles.container}>
          <Text style={styles.title}>Laporan Data SPBE Sudah Lengkap Tahun 2023</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableOpd}>
                <Text style={styles.tableCellHeader}>NAMA OPD</Text>
              </View>
              <View style={styles.tableDok}>
                <Text style={styles.tableCellHeader}>DOKUMEN TERKUMPUL</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>INDIKATOR</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>TGL UPLOAD</Text>
              </View>
            </View>

            {
              data.map((item) => {
                return (
                  <>
                    <View style={styles.tableRow}>
                      <View style={styles.tableOpd}>
                        <Text style={styles.tableCell}>{ item.nama_opd }</Text>
                      </View>
                      <View style={styles.tableDok}>
                        <Text style={styles.tableCell}>{item.nama_dokumen}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.nama_indikator}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.tanggal.substring(0, 10)}</Text>
                      </View>
                    </View>
                  </>
                )
              })
            }
          </View>
        </View>
      </Page>

      <Page orientation='landscape'>
        <View style={styles.container}>
          <Text style={styles.title}>Laporan Data SPBE Belum Lengkap Tahun 2023</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableOpd}>
                <Text style={styles.tableCellHeader}>NAMA OPD</Text>
              </View>
              <View style={styles.tableDok}>
                <Text style={styles.tableCellHeader}>DOKUMEN</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCellHeader}>INDIKATOR</Text>
              </View>
            </View>

            {
              data2.map((item) => {
                return (
                  <>
                    <View style={styles.tableRow}>
                      <View style={styles.tableOpd}>
                        <Text style={styles.tableCell}>{ item.nama_opd }</Text>
                      </View>
                      <View style={styles.tableDok}>
                        <Text style={styles.tableCell}>{item.nama_dokumen}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>{item.nama_indikator}</Text>
                      </View>
                    </View>
                  </>
                )
              })
            }
          </View>
        </View>
      </Page>
    </Document>
  );

 
  // Gaya untuk PDF
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 30,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    table: {
      display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '13%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableOpd: {
      width: '30%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableDok: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableCell: {
      margin: 'left',
      padding: 3,
      marginTop: 5,
      fontSize: 12,
    },
    tableCellHeader: {
      margin: 'auto',
      fontWeight: '700',
      marginTop: 5,
      fontSize: 12,
    },
    pdfViewer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
    },
  });




  return (

    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />

        <PDFViewer style={styles.pdfViewer}>
          <MyDocument />
        </PDFViewer>

      </div>
    </div>
  )
}

export default PrintPdf