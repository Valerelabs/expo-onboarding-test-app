import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  TextInput as RNTextInput,
  useColorScheme,
  Keyboard,
} from "react-native";
import callingCodes from "../utils/callingCodes.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Country {
  name: string;
  flag: string;
  code: string;
  callingCode: string;
}

interface CountryCodePickerProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
  error?: string;
}

export const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
  selectedCountry,
  onSelect,
  error,
}) => {
  const insets = useSafeAreaInsets();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const backgroundColor = isDark ? "#000000" : "#FFFFFF";
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const subtextColor = isDark ? "#8E8E93" : "#6C6C70";
  const inputBackgroundColor = isDark ? "#1C1C1E" : "#F2F2F7";
  const borderColor = isDark ? "#38383A" : "#D1D1D6";
  const modalBackgroundColor = isDark ? "#1C1C1E" : "#FFFFFF";

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) {
      return callingCodes as Country[];
    }

    const query = searchQuery.toLowerCase();
    return (callingCodes as Country[]).filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.callingCode.includes(query) ||
        country.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelectCountry = (country: Country) => {
    onSelect(country);
    setIsModalVisible(false);
    setSearchQuery("");
  };

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={[styles.countryItem, { borderBottomColor: borderColor }]}
      onPress={() => handleSelectCountry(item)}
    >
      <View style={styles.countryItemLeft}>
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.countryInfo}>
          <Text
            style={[styles.countryName, { color: textColor }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={[styles.countryCode, { color: subtextColor }]}>
            {item.code}
          </Text>
        </View>
      </View>
      <Text style={[styles.callingCode, { color: textColor }]}>
        {item.callingCode}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>Country Code</Text>
      <TouchableOpacity
        style={[
          styles.pickerButton,
          {
            backgroundColor: inputBackgroundColor,
            borderColor: error ? "#FF3B30" : "transparent",
          },
        ]}
        onPress={() => {
          Keyboard.dismiss();
          setIsModalVisible(true);
        }}
      >
        <View style={styles.selectedCountry}>
          <Text style={styles.selectedFlag}>{selectedCountry.flag}</Text>
          <Text style={[styles.selectedCode, { color: textColor }]}>
            {selectedCountry.callingCode}
          </Text>
        </View>
        <Text style={[styles.dropdownIcon, { color: textColor }]}>▼</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View
          style={[
            styles.modalContainer,
            { backgroundColor, paddingTop: insets.top },
          ]}
        >
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: textColor }]}>
              Select Country
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                setSearchQuery("");
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <RNTextInput
              style={[
                styles.searchInput,
                { backgroundColor: inputBackgroundColor, color: textColor },
              ]}
              placeholder="Search by country name, code, or calling code"
              placeholderTextColor={subtextColor}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <FlatList
            data={filteredCountries}
            keyExtractor={(item) => item.code}
            renderItem={renderCountryItem}
            style={[styles.list, { backgroundColor: modalBackgroundColor }]}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: subtextColor }]}>
                  No countries found
                </Text>
              </View>
            }
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 16,
    minHeight: 54,
  },
  selectedCountry: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedFlag: {
    fontSize: 24,
    marginRight: 8,
  },
  selectedCode: {
    fontSize: 16,
    fontWeight: "500",
  },
  dropdownIcon: {
    fontSize: 12,
  },
  errorText: {
    fontSize: 12,
    color: "#FF3B30",
    marginTop: 4,
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#007AFF",
    fontWeight: "300",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  countryItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 16,
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  countryCode: {
    fontSize: 12,
  },
  callingCode: {
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
  },
});
