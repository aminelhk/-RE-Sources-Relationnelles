import React, { useState } from 'react'
import { View, Button, Text } from 'react-native'

interface PaginationProps {
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      onPageChange(currentPage + 1)
    }
  }

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
      <Button title='Avant' onPress={handlePrevPage} disabled={currentPage === 1} />
      <Text style={{ marginHorizontal: 10 }}>
        {currentPage} / {totalPages}
      </Text>
      <Button title='Après' onPress={handleNextPage} disabled={currentPage === totalPages} />
    </View>
  )
}

export default Pagination
