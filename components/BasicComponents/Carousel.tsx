import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Image,
    View,
    ScrollView,
    Pressable,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Animated,
    LayoutChangeEvent,
} from 'react-native'
import { colors } from '../../assets'
import { TmdbImage, TmdbImageParams } from './TmdbImage'
import { LocalIcon } from '../Types/LocalIcon'
import { CarouselEntry, CarouselParams } from './Types/CarouselParams'

const EDGE_PROXIMITY_THRESHOLD = 40
const FADING_MILISECONDS = 500

const renderService = (
    item: CarouselEntry,
    index: number,
    params: CarouselParams
) => {
    const _params: TmdbImageParams = {
        resource: item.tmdbResource,
        type: params.type,
        style: params.itemStyle,
    }

    return (
        <Pressable
            key={index}
            onPress={() => params.onItemPressed?.(item.itemData)}
            style={{ position: 'relative' }}
        >
            {params.renderX && (
                <Image
                    source={LocalIcon.x}
                    style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        width: 15,
                        height: 15,
                        zIndex: 1,
                    }}
                />
            )}
            {params.itemContainer?
                params.itemContainer(<TmdbImage {..._params} />, item.itemData)
                :
                <TmdbImage {..._params} />
            }
        </Pressable>
    )
}

const isCloseToRight = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
}: NativeScrollEvent) => {
    return (
        layoutMeasurement.width + contentOffset.x >=
        contentSize.width - EDGE_PROXIMITY_THRESHOLD
    )
}

const isCloseToLeft = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
}: NativeScrollEvent) => {
    const paddingToLeft = EDGE_PROXIMITY_THRESHOLD
    return contentOffset.x <= paddingToLeft
}

export const Carousel = (params: CarouselParams) => {
    const [showLeftIcon, setShowLeftIcon] = useState(false)
    const [showRightIcon, setShowRightIcon] = useState(false)

    const [opacityLeft] = useState(new Animated.Value(showLeftIcon ? 1 : 0))
    const [opacityRight] = useState(new Animated.Value(showRightIcon ? 1 : 0))

    const leftIcon = LocalIcon.left
    const rightIcon = LocalIcon.right

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isCloseToRight(event.nativeEvent)) {
            setShowRightIcon(false)
        } else {
            setShowRightIcon(true)
        }
        if (isCloseToLeft(event.nativeEvent)) {
            setShowLeftIcon(false)
        } else {
            setShowLeftIcon(true)
        }
    }

    const fadeTransition = (opacity: Animated.Value, showIcon: Boolean) => {
        Animated.timing(opacity, {
            toValue: showIcon ? 1 : 0,
            duration: FADING_MILISECONDS,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        fadeTransition(opacityLeft, showLeftIcon)
    }, [showLeftIcon])

    useEffect(() => {
        fadeTransition(opacityRight, showRightIcon)
    }, [showRightIcon])

    const sideContainerHeight =
        params.itemStyle.height + params.itemStyle.margin * 2
    const sideIconTop = (sideContainerHeight - 32) / 2

    const onLayout = (event: LayoutChangeEvent) => {
        const containerWidth = event.nativeEvent.layout.width
        const itemWidth = params.itemStyle.width
            ? params.itemStyle.width
            : params.itemStyle.aspectRatio
            ? params.itemStyle.height * params.itemStyle.aspectRatio
            : params.itemStyle.height

        const visibleWidth = itemWidth + params.itemStyle.margin * 2
        if (
            containerWidth + visibleWidth <
            visibleWidth * params.items.length
        ) {
            setShowRightIcon(true)
        }
    }

    return (
        <View style={[styles.container, params.containerStyle]}>
            <Animated.View
                style={[
                    styles.sideIconContainerLeft,
                    { opacity: opacityLeft, 
                        // TODO: Refactor calculo de altura, deben probaser más casos usando el parametro tmdbImageContainer
                        // height: sideContainerHeight
                     },
                ]}
            >
                <Image
                    source={leftIcon}
                    style={[styles.sideIconLeft, { top: sideIconTop }]}
                />
            </Animated.View>

            <ScrollView
                horizontal
                contentContainerStyle={styles.contentContainerStyle}
                onScroll={onScroll}
                onLayout={onLayout}
            >
                {params.items.map((item, index) =>
                    renderService(item, index, params)
                )}
            </ScrollView>

            <Animated.View
                style={[
                    styles.sideIconContainerRight,
                    { opacity: opacityRight, 
                        // TODO: Refactor calculo de altura, deben probaser más casos usando el parametro tmdbImageContainer
                        // height: sideContainerHeight 
                    },
                ]}
            >
                <Image
                    source={rightIcon}
                    style={[styles.sideIconRight, { top: sideIconTop }]}
                />
            </Animated.View>
        </View>
    )
}
const baseStyles = StyleSheet.create({
    sideIconContainer: {
        position: 'absolute',
        backgroundColor: colors.secondaryWhite,
        zIndex: 3,
        width: 30,
        // TODO: Refactor calculo de altura, deben probaser más casos usando el parametro tmdbImageContainer
        height: "100%"
    },
    sideIcon: {
        position: 'absolute',
        zIndex: 2,
        width: 20,
        height: 32,
    },
})

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    contentContainerStyle: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoStyle: {
        height: 100,
        aspectRatio: 1,
        borderRadius: 25,
        margin: 10,
    },
    sideIconContainerLeft: {
        ...baseStyles.sideIconContainer,
        left: 0,
    },
    sideIconContainerRight: {
        ...baseStyles.sideIconContainer,
        right: 0,
    },
    sideIconLeft: {
        ...baseStyles.sideIcon,
        left: 5,
    },
    sideIconRight: {
        ...baseStyles.sideIcon,
        right: 5,
    },
})
