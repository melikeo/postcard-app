import { Document, Page, View, Text, Image, StyleSheet, Font } from '@react-pdf/renderer';
import stampImage from '../assets/stamp.png';

Font.register({
  family: 'Square Peg',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/squarepeg/v5/y83eW48Nzw6ZlUHc-phrBDHrHHfrFPE.ttf',
    },
  ],
});


const styles = StyleSheet.create({
  page: {
    width: 600,
    height: 400,
    backgroundColor: '#fff',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  backContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    position: 'relative',
    padding: 32,
    fontFamily: 'Square Peg',
  },
  left: {
    width: '50%',
    paddingRight: 16,
    justifyContent: 'flex-start',
  },
  message: {
    fontSize: 36,
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    fontFamily: 'Square Peg',
  },
  divider: {
    position: 'absolute',
    left: '50%',
    top: 0,
    width: 2,
    height: '100%',
    backgroundColor: '#888',
  },
  right: {
    width: '50%',
    paddingLeft: 16,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'relative',
  },
 stamp: {
  position: 'absolute',
  top: 0,
  right: 0,
  width: 280,
  height: 230,
  borderRadius: 1,  
  objectFit: 'contain',
}
,
  recipient: {
    fontSize: 38,
    borderBottom: '2px solid #888',
    marginBottom: 8,
    width: '100%',
    fontFamily: 'Square Peg',
  }
});

type PostcardPDFProps = {
  image: string;
  message: string;
  recipientName: string;
  recipientCountry: string;
};

export default function PostcardPDF({
  image,
  message,
  recipientName,
  recipientCountry
}: PostcardPDFProps) {
  return (
    <Document>
      {/* front */}
      <Page size={{ width: 600, height: 400 }} style={styles.page}>
        <Image src={image} style={styles.image} />
      </Page>
      {/* back */}
      <Page size={{ width: 600, height: 400 }} style={styles.page}>
        <View style={styles.backContainer}>
          {/* left side: message */}
          <View style={styles.left}>
            <Text style={styles.message}>{message}</Text>
          </View>
          {/* line */}
          <View style={styles.divider} />
          {/* right side */}
          <View style={styles.right}>
            <Image src={stampImage} style={styles.stamp} />
            <View style={{ marginTop: 100, width: '100%' }}>
              <Text style={styles.recipient}>{recipientName}</Text>
              <Text style={styles.recipient}>{recipientCountry}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
