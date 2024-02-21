import React, { ReactNode } from 'react'
import { colors } from '../../assets'
import { BodyText } from '../BasicComponents/BodyText'

type SearchListProps = {
    showLoading: boolean
    contentList: any
    textSearched: string
    children?: ReactNode
}

export const SearchList = (params: SearchListProps) => {
    const { showLoading, contentList, textSearched, children } = params

    return (
        <>
            {showLoading ? null : contentList.length === 0 ? (
                <BodyText
                    style={{
                        marginTop: 20,
                        fontWeight: 'bold',
                        alignSelf: 'flex-start',
                        marginLeft: '5%',
                    }}
                    size="big"
                    color={colors.primaryBlack}
                    body={'No se encontraron resultados para: ' + textSearched}
                />
            ) : (
                children // Renderiza los children directamente
            )}
        </>
    )
}
