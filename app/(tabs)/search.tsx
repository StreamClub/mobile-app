import { View, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../assets'
import { SearchList } from '../../components/Search/SearchList'
import { SearchContentBar } from '../../components/Search/SearchBar'
import { ContentList } from '../../components/Content/ContentList'
import { ContentEntry } from '../../entities/ContentEntry'
import { SearchCategories } from '../../components/Search/SearchCategories'
import { useAppSelector } from '../../hooks/redux/useAppSelector'
import { ArtistEntry } from '../../entities/ArtistListEntry'
import { UserEntry } from '../../entities/UsersListEntry'
import { DiscoverButton } from '../../components/Search/DiscoverButton'
import { useSearchContent } from '../../hooks/search/useSearchContent'

export default function Search() {
    const { textSearched, results } = useAppSelector(
        (state) => state.searchContent
    )
    const { searchTextPage } = useSearchContent();
    // ------------------------------------------------------------
    // Render functions
    // ------------------------------------------------------------

    const renderSearchHistoryTitle = () => {
        return (
            <View style={{justifyContent: 'flex-end', flex: 1, margin: 10}}>
                <DiscoverButton />
            </View>
        )
    }

    const renderContentList = (contentList: ContentEntry[] | ArtistEntry[] | UserEntry[]) => {
        return (
            <SearchList length={contentList.length}>
                <ContentList 
                    searchNextPage={searchTextPage}
                    contentEntry={contentList} />
            </SearchList>
        )
    }
    // ------------------------------------------------------------

    return (
        <View style={styles.container}>
            <SearchContentBar />
            <SearchCategories />

            {textSearched.length == 0
                ? renderSearchHistoryTitle()
                : renderContentList(results)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.secondaryWhite
    },
})
