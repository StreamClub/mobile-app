import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { colors } from '../../assets'
import { DiscoverForm } from '../../components/Discover/DiscoverForm'
import { DiscoverContentList } from '../../components/Discover/DiscoverContentList'
import { ContentEntry } from '../../entities/ContentEntry'

export default function Discover() {
    const [results, setResults] = useState<ContentEntry[]>([]);
    const [searched, setSearched] = useState<boolean>(false);
    const [filters, setFilters] = useState({});
    
    return (
        <View style={styles.container}>
            {searched?
                <DiscoverContentList 
                    setResults={setResults}
                    setSearched={setSearched}
                    contentList={results}
                    filters={filters}
                    setFilters={setFilters} /> :
                <DiscoverForm
                    setFilters={setFilters}
                    setResults={setResults}
                    setSearched={setSearched} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryWhite
    },
})
