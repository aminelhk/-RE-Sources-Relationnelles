import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";

type FileInfo = {
  uri: string;
  name: string;
  size: number;
  type: string;
};

const FileUploadComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileInfo[]>([]);

  const handleFileUpload = async () => {
    try {
      const results = await DocumentPicker.getDocumentAsync({
        type: ["image/*", "application/pdf"],
        multiple: true,
      });
      if (results.type === "success") {
        setSelectedFiles(results.output);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled the picker");
      } else {
        console.error(err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ajouter des fichiers</Text>
      <Text style={styles.hintText}>
        Taille maximale : 500 Mo. Formats supportés : jpg, png, pdf. Plusieurs
        fichiers possibles.
      </Text>
      <Button title="Choisir des fichiers" onPress={handleFileUpload} />
      {selectedFiles.length > 0 && (
        <View style={styles.filesList}>
          {selectedFiles.map((file, index) => (
            <Text key={index} style={styles.fileName}>
              {file.name}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  hintText: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 16,
  },
  filesList: {
    marginTop: 16,
  },
  fileName: {
    fontSize: 16,
    color: "pink",
  },
});

export default FileUploadComponent;
